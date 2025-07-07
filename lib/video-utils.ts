import { supabase } from "./supabase"

/**
 * Utility functions for video management with public storage
 */

export interface VideoMetadata {
  id: string
  title: string
  duration: string
  filePath: string
  moduleId: string
  order: number
}

/**
 * Get a public URL for a video file
 */
export const getVideoPublicUrl = (filePath: string): string => {
  if (!filePath) {
    console.warn("No file path provided for video")
    return ""
  }

  // If the filePath is already a full URL (like our sample videos), return it directly
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
    console.log(`Using direct URL: ${filePath}`)
    return filePath
  }

  // Get the public URL from Supabase storage
  const { data } = supabase.storage
    .from("videos")
    .getPublicUrl(filePath)

  if (!data?.publicUrl) {
    console.warn(`Failed to generate public URL for: ${filePath}`)
    return ""
  }

  console.log(`Generated public URL for: ${filePath}`)
  return data.publicUrl
}

/**
 * Batch generate public URLs for multiple videos
 */
export const getBatchVideoPublicUrls = (filePaths: string[]): Record<string, string> => {
  const results: Record<string, string> = {}

  filePaths.forEach((filePath) => {
    results[filePath] = getVideoPublicUrl(filePath)
  })

  return results
}

/**
 * Check if a video file exists in storage (simplified for public access)
 */
export const checkVideoExists = async (filePath: string): Promise<boolean> => {
  try {
    // If it's a direct URL, assume it exists
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      return true
    }

    // For public storage, we can try to fetch the public URL
    const publicUrl = getVideoPublicUrl(filePath)
    return !!publicUrl
  } catch (error) {
    console.error("Error checking video existence:", error)
    return false
  }
}

/**
 * Get video metadata from database
 */
export const getVideoMetadata = async (videoId: string): Promise<VideoMetadata | null> => {
  try {
    const { data, error } = await supabase
      .from("module_videos")
      .select("id, title, duration, video_file_path, module_id, order_number")
      .eq("id", videoId)
      .single()

    if (error) {
      console.error("Error fetching video metadata:", error)
      return null
    }

    return {
      id: data.id,
      title: data.title,
      duration: data.duration || "0 min",
      filePath: data.video_file_path || "",
      moduleId: data.module_id,
      order: data.order_number || 1,
    }
  } catch (error) {
    console.error("Error fetching video metadata:", error)
    return null
  }
}

/**
 * Update video progress in database
 */
export const updateVideoProgress = async (
  videoId: string,
  progress: number,
  timeWatched: number = 0,
): Promise<boolean> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      console.warn("No authenticated user found")
      return false
    }

    const isCompleted = progress >= 95 // Mark as completed if 95% or more watched

    const { error } = await supabase.from("video_progress").upsert(
      {
        user_id: user.id,
        video_id: videoId,
        progress: Math.round(progress),
        is_completed: isCompleted,
        last_watched_at: new Date().toISOString(),
        time_watched: timeWatched,
      },
      {
        onConflict: "user_id,video_id",
      },
    )

    if (error) {
      console.error("Error updating video progress:", error)
      return false
    }

    console.log(`Video progress updated: ${progress}% (completed: ${isCompleted})`)
    return true
  } catch (error) {
    console.error("Error updating video progress:", error)
    return false
  }
}

/**
 * Get user's progress for a specific video
 */
export const getUserVideoProgress = async (videoId: string): Promise<{
  progress: number
  isCompleted: boolean
  timeWatched: number
} | null> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return null
    }

    const { data, error } = await supabase
      .from("video_progress")
      .select("progress, is_completed, time_watched")
      .eq("user_id", user.id)
      .eq("video_id", videoId)
      .single()

    if (error) {
      // If no progress record exists, return default values
      if (error.code === "PGRST116") {
        return { progress: 0, isCompleted: false, timeWatched: 0 }
      }
      console.error("Error fetching video progress:", error)
      return null
    }

    return {
      progress: data.progress || 0,
      isCompleted: data.is_completed || false,
      timeWatched: data.time_watched || 0,
    }
  } catch (error) {
    console.error("Error fetching video progress:", error)
    return null
  }
}