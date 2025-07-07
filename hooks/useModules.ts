"use client"

import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import { getVideoPublicUrl, getUserVideoProgress } from "../lib/video-utils"
import type { OnboardingModule, ModuleVideo } from "../types/module"

export const useModules = () => {
  const [modules, setModules] = useState<OnboardingModule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchModules = async () => {
    try {
      setError(null)

      console.log("Fetching onboarding modules...")

      // Fetch modules with their videos from Supabase
      const { data: modulesData, error: modulesError } = await supabase
        .from("onboarding_modules")
        .select(`
          *,
          videos:module_videos!module_videos_module_id_fkey(*)
        `)
        .eq("is_published", true)
        .order("module_number", { ascending: true })

      if (modulesError) {
        throw new Error(`Failed to fetch modules: ${modulesError.message}`)
      }

      if (!modulesData || modulesData.length === 0) {
        console.log("No published modules found")
        setModules([])
        return
      }

      console.log(`Found ${modulesData.length} modules`)

      // Get current user for progress tracking
      const {
        data: { user },
      } = await supabase.auth.getUser()

      // Transform the data to match our interface
      const transformedModules: OnboardingModule[] = await Promise.all(
        modulesData.map(async (module: any) => {
          // Sort videos by order
          const sortedVideos = (module.videos || []).sort(
            (a: any, b: any) => (a.order_number || 0) - (b.order_number || 0),
          )

          // Get progress for all videos in this module
          let moduleProgress = 0
          let completedVideos = 0

          if (user && sortedVideos.length > 0) {
            // Get progress for each video
            const progressPromises = sortedVideos.map((video: any) => getUserVideoProgress(video.id))
            const progressResults = await Promise.all(progressPromises)

            completedVideos = progressResults.filter((p) => p?.isCompleted).length
            moduleProgress = sortedVideos.length > 0 ? Math.round((completedVideos / sortedVideos.length) * 100) : 0
          }

          // Transform videos with public URLs
          const transformedVideos: ModuleVideo[] = await Promise.all(
            sortedVideos.map(async (video: any) => {
              const progressData = user ? await getUserVideoProgress(video.id) : null

              // Get public URL for the video
              const publicUrl = video.video_file_path ? getVideoPublicUrl(video.video_file_path) : ""

              return {
                id: video.id,
                title: video.title,
                duration: video.duration || "0 min",
                isCompleted: progressData?.isCompleted || false,
                videoUrl: publicUrl,
                video_file_path: video.video_file_path,
                order: video.order_number || 1,
                description: video.description,
                transcript: video.transcript,
                documents: video.documents,
              }
            }),
          )

          // Determine if module is locked based on module number and previous module completion
          let isLocked = false
          if (module.module_number > 1) {
            // For modules after the first, check if the previous module is completed
            const previousModuleNumber = module.module_number - 1
            const previousModule = modulesData.find(m => m.module_number === previousModuleNumber)
            
            if (previousModule && user) {
              // Check if previous module is completed
              const previousModuleVideos = (previousModule.videos || [])
              if (previousModuleVideos.length > 0) {
                const previousProgressPromises = previousModuleVideos.map((video: any) => getUserVideoProgress(video.id))
                const previousProgressResults = await Promise.all(previousProgressPromises)
                const previousCompletedVideos = previousProgressResults.filter((p) => p?.isCompleted).length
                const previousModuleProgress = Math.round((previousCompletedVideos / previousModuleVideos.length) * 100)
                
                // Lock if previous module is not 100% complete
                isLocked = previousModuleProgress < 100
              } else {
                // If previous module has no videos, consider it incomplete
                isLocked = true
              }
            } else {
              // If no user or can't find previous module, lock it
              isLocked = true
            }
          }

          return {
            id: module.id,
            title: module.title,
            description: module.description || "",
            duration: module.duration || "0 mins",
            progress: moduleProgress,
            isCompleted: moduleProgress === 100,
            isLocked: isLocked,
            moduleNumber: module.module_number,
            category: module.category as "orientation" | "training" | "assessment" | "certification",
            thumbnailUrl: module.thumbnail_url,
            tags: module.tags || [],
            videoCount: transformedVideos.length,
            videos: transformedVideos,
            createdAt: module.created_at,
            updatedAt: module.updated_at,
          }
        }),
      )

      console.log(`Successfully transformed ${transformedModules.length} modules`)
      setModules(transformedModules)
    } catch (err) {
      console.error("Error fetching modules:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch modules")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const refreshModules = async () => {
    setRefreshing(true)
    await fetchModules()
  }

  useEffect(() => {
    fetchModules()
  }, [])

  return {
    modules,
    loading,
    error,
    refreshing,
    refreshModules,
  }
}