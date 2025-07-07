"use client"

import { useState, useCallback } from "react"
import { supabase } from "../lib/supabase"

export interface VideoStorageHook {
  getSignedVideoUrl: (filePath: string) => Promise<string | null>
  uploadVideo: (file: File, filePath: string) => Promise<string | null>
  deleteVideo: (filePath: string) => Promise<boolean>
  loading: boolean
  error: string | null
}

export const useVideoStorage = (): VideoStorageHook => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getSignedVideoUrl = useCallback(async (filePath: string): Promise<string | null> => {
    try {
      setLoading(true)
      setError(null)

      console.log("Generating signed URL for:", filePath)

      const { data, error: urlError } = await supabase.storage
        .from("videos")
        .createSignedUrl(filePath, 3600) // 1 hour expiry

      if (urlError) {
        console.error("Failed to create signed URL:", urlError)
        setError(`Failed to generate video URL: ${urlError.message}`)
        return null
      }

      if (!data?.signedUrl) {
        setError("No signed URL returned")
        return null
      }

      console.log("Successfully generated signed URL")
      return data.signedUrl
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      console.error("Error generating signed URL:", err)
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const uploadVideo = useCallback(async (file: File, filePath: string): Promise<string | null> => {
    try {
      setLoading(true)
      setError(null)

      console.log("Uploading video to:", filePath)

      const { data, error: uploadError } = await supabase.storage.from("videos").upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (uploadError) {
        console.error("Failed to upload video:", uploadError)
        setError(`Failed to upload video: ${uploadError.message}`)
        return null
      }

      console.log("Successfully uploaded video:", data.path)
      return data.path
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      console.error("Error uploading video:", err)
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteVideo = useCallback(async (filePath: string): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)

      console.log("Deleting video:", filePath)

      const { error: deleteError } = await supabase.storage.from("videos").remove([filePath])

      if (deleteError) {
        console.error("Failed to delete video:", deleteError)
        setError(`Failed to delete video: ${deleteError.message}`)
        return false
      }

      console.log("Successfully deleted video")
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      console.error("Error deleting video:", err)
      setError(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    getSignedVideoUrl,
    uploadVideo,
    deleteVideo,
    loading,
    error,
  }
}