"use client"

import { useState, useEffect } from "react"
import { router } from "expo-router"
import { supabase } from "../lib/supabase"
import { getVideoPublicUrl, updateVideoProgress, getUserVideoProgress } from "../lib/video-utils"
import type { OnboardingModule, ModuleVideo } from "../types/module"

// Extended video interface with additional fields for video page
interface ExtendedModuleVideo extends ModuleVideo {
  description?: string
  transcript?: string
  documents?: string
  publicUrl?: string
}

export const useVideoData = (moduleId: string, videoId: string) => {
  const [video, setVideo] = useState<ExtendedModuleVideo | null>(null)
  const [module, setModule] = useState<OnboardingModule | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVideoData = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log(`Fetching video data for module: ${moduleId}, video: ${videoId}`)

      // Fetch video data from Supabase
      const { data: videoData, error: videoError } = await supabase
        .from("module_videos")
        .select("*")
        .eq("id", videoId)
        .eq("is_published", true)
        .single()

      if (videoError) {
        throw new Error(`Failed to fetch video: ${videoError.message}`)
      }

      if (!videoData) {
        throw new Error("Video not found")
      }

      // Fetch module data with all videos
      const { data: moduleData, error: moduleError } = await supabase
        .from("onboarding_modules")
        .select(`
          *,
          videos:module_videos!module_videos_module_id_fkey(*)
        `)
        .eq("id", moduleId)
        .eq("is_published", true)
        .single()

      if (moduleError) {
        throw new Error(`Failed to fetch module: ${moduleError.message}`)
      }

      if (!moduleData) {
        throw new Error("Module not found")
      }

      // Generate public URL for the current video
      let publicUrl = ""
      if (videoData.video_file_path) {
        publicUrl = getVideoPublicUrl(videoData.video_file_path)
        
        if (!publicUrl) {
          console.warn(`Failed to generate public URL for video: ${videoData.video_file_path}`)
        }
      }

      // Get user's progress for this video
      const progressData = await getUserVideoProgress(videoId)

      // Generate public URLs for all videos in the module
      const videosWithPublicUrls = await Promise.all(
        (moduleData.videos || [])
          .sort((a: any, b: any) => (a.order_number || 0) - (b.order_number || 0))
          .map(async (vid: any) => {
            let videoPublicUrl = ""
            if (vid.video_file_path) {
              videoPublicUrl = getVideoPublicUrl(vid.video_file_path)
            }

            // Get progress for each video
            const vidProgress = await getUserVideoProgress(vid.id)

            return {
              id: vid.id,
              title: vid.title,
              duration: vid.duration || "0 min",
              isCompleted: vidProgress?.isCompleted || false,
              videoUrl: videoPublicUrl,
              video_file_path: vid.video_file_path,
              order: vid.order_number || 1,
              description: vid.description,
              transcript: vid.transcript,
              documents: vid.documents,
              publicUrl: videoPublicUrl,
            }
          }),
      )

      const extendedVideo: ExtendedModuleVideo = {
        id: videoData.id,
        title: videoData.title,
        duration: videoData.duration || "0 min",
        isCompleted: progressData?.isCompleted || false,
        videoUrl: publicUrl,
        video_file_path: videoData.video_file_path,
        order: videoData.order_number || 1,
        description: videoData.description,
        transcript: videoData.transcript,
        documents: videoData.documents,
        publicUrl,
      }

      // Calculate module progress
      const completedVideos = videosWithPublicUrls.filter((v) => v.isCompleted).length
      const totalVideos = videosWithPublicUrls.length
      const moduleProgress = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0

      const extendedModule: OnboardingModule = {
        id: moduleData.id,
        title: moduleData.title,
        description: moduleData.description || "",
        duration: moduleData.duration || "0 mins",
        progress: moduleProgress,
        isCompleted: moduleProgress === 100,
        isLocked: false,
        moduleNumber: moduleData.module_number,
        category: moduleData.category as "orientation" | "training" | "assessment" | "certification",
        thumbnailUrl: moduleData.thumbnail_url,
        tags: moduleData.tags || [],
        videoCount: videosWithPublicUrls.length,
        videos: videosWithPublicUrls,
        createdAt: moduleData.created_at,
        updatedAt: moduleData.updated_at,
      }

      setVideo(extendedVideo)
      setModule(extendedModule)

      console.log("Successfully loaded video data:", {
        videoTitle: extendedVideo.title,
        moduleTitle: extendedModule.title,
        hasPublicUrl: !!publicUrl,
        videoCount: videosWithPublicUrls.length,
      })
    } catch (err) {
      console.error("Error fetching video data:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch video data")
    } finally {
      setLoading(false)
    }
  }

  const updateProgress = async (progress: number) => {
    try {
      const success = await updateVideoProgress(videoId, progress)
      if (success) {
        // Update local state
        setVideo((prev) => (prev ? { ...prev, isCompleted: progress >= 95 } : prev))
        
        // Refetch module data to update progress
        await fetchVideoData()
      }
      return success
    } catch (err) {
      console.error("Failed to update progress:", err)
      return false
    }
  }

  const navigateToVideo = (newVideoId: string) => {
    router.push(`/video/${moduleId}/${newVideoId}`)
  }

  useEffect(() => {
    if (moduleId && videoId) {
      fetchVideoData()
    }
  }, [moduleId, videoId])

  return {
    video,
    module,
    loading,
    error,
    updateProgress,
    navigateToVideo,
    refetch: fetchVideoData,
  }
}