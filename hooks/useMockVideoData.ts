"use client"

import { useState, useEffect } from "react"
import { router } from "expo-router"
import { getVideoById, updateVideoProgress as updateMockProgress } from "../data/mockModules"
import type { OnboardingModule, ModuleVideo } from "../types/module"

// Extended video interface with additional fields for video page
interface ExtendedModuleVideo extends ModuleVideo {
  description?: string
  transcript?: string
  documents?: string
}

export const useMockVideoData = (moduleId: string, videoId: string) => {
  const [video, setVideo] = useState<ExtendedModuleVideo | null>(null)
  const [module, setModule] = useState<OnboardingModule | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVideoData = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log(`Fetching mock video data for module: ${moduleId}, video: ${videoId}`)

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      const { video: foundVideo, module: foundModule } = getVideoById(moduleId, videoId)

      if (!foundVideo || !foundModule) {
        throw new Error("Video or module not found")
      }

      setVideo(foundVideo as ExtendedModuleVideo)
      setModule(foundModule)

      console.log("Successfully loaded mock video data:", {
        videoTitle: foundVideo.title,
        moduleTitle: foundModule.title,
        videoCount: foundModule.videos?.length || 0,
      })
    } catch (err) {
      console.error("Error fetching mock video data:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch video data")
    } finally {
      setLoading(false)
    }
  }

  const updateProgress = async (progress: number) => {
    try {
      const success = updateMockProgress(moduleId, videoId, progress)
      if (success) {
        // Update local state
        setVideo((prev) => (prev ? { ...prev, isCompleted: progress >= 95 } : prev))
        
        // Update module state if needed
        const { module: updatedModule } = getVideoById(moduleId, videoId)
        if (updatedModule) {
          setModule(updatedModule)
        }
      }
      return success
    } catch (err) {
      console.error("Failed to update mock progress:", err)
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