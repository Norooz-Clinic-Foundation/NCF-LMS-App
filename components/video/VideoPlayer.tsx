"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, ActivityIndicator, Alert } from "react-native"
import { Video, ResizeMode, type AVPlaybackStatus } from "expo-av"
import { Play, Pause, Volume2, VolumeX, RotateCcw, SkipForward } from "lucide-react-native"

interface VideoPlayerProps {
  videoUrl: string
  thumbnailUrl?: string
  onProgress?: (progress: number) => void
  autoPlay?: boolean
  initialProgress?: number
}

const { width } = Dimensions.get("window")

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  thumbnailUrl,
  onProgress,
  autoPlay = false,
  initialProgress = 0,
}) => {
  const videoRef = useRef<Video>(null)
  const [status, setStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus)
  const [isLoading, setIsLoading] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [lastReportedProgress, setLastReportedProgress] = useState(0)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('')

  // Calculate container dimensions
  const containerHeight = width * (9 / 16) // 16:9 aspect ratio

  // Cleanup function to stop and unload video
  const cleanupVideo = async () => {
    if (videoRef.current) {
      try {
        console.log("Cleaning up video - stopping and unloading")
        await videoRef.current.stopAsync()
        await videoRef.current.unloadAsync()
        setIsVideoLoaded(false)
        setStatus({} as AVPlaybackStatus)
      } catch (error) {
        console.error("Error during video cleanup:", error)
      }
    }
  }

  // Stop and unload video when component unmounts
  useEffect(() => {
    return () => {
      console.log("VideoPlayer component unmounting - cleaning up")
      cleanupVideo()
    }
  }, [])

  // Handle video URL changes - stop previous video and load new one
  useEffect(() => {
    const loadNewVideo = async () => {
      if (!videoRef.current) return

      try {
        // If there's no video URL, just cleanup and return
        if (!videoUrl) {
          console.log("No video URL provided - cleaning up")
          await cleanupVideo()
          setCurrentVideoUrl('')
          return
        }

        // If it's the same URL, don't reload
        if (videoUrl === currentVideoUrl && isVideoLoaded) {
          console.log("Same video URL, not reloading")
          return
        }

        console.log("Loading new video:", videoUrl)
        
        // Stop and unload any existing video first
        if (isVideoLoaded || currentVideoUrl) {
          await cleanupVideo()
        }
        
        // Reset states
        setIsLoading(true)
        setHasError(false)
        setLastReportedProgress(0)
        setShowControls(true)
        setCurrentVideoUrl(videoUrl)
        
        // Load the new video
        await videoRef.current.loadAsync({ uri: videoUrl }, {}, false)
        setIsVideoLoaded(true)
        
      } catch (error) {
        console.error("Error loading new video:", error)
        setHasError(true)
        setIsLoading(false)
      }
    }

    loadNewVideo()
  }, [videoUrl])

  // Auto-hide controls timer
  useEffect(() => {
    let hideControlsTimer: NodeJS.Timeout

    if (showControls && status && "isPlaying" in status && status.isPlaying) {
      hideControlsTimer = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }

    return () => {
      if (hideControlsTimer) {
        clearTimeout(hideControlsTimer)
      }
    }
  }, [showControls, status])

  // Report progress to parent component
  useEffect(() => {
    if (
      status &&
      "durationMillis" in status &&
      "positionMillis" in status &&
      status.durationMillis &&
      status.positionMillis &&
      onProgress
    ) {
      const progressPercent = (status.positionMillis / status.durationMillis) * 100

      // Only report progress every 5% to avoid too many updates
      if (Math.abs(progressPercent - lastReportedProgress) >= 5) {
        onProgress(progressPercent)
        setLastReportedProgress(progressPercent)
      }
    }
  }, [status, onProgress, lastReportedProgress])

  const handlePlayPause = async () => {
    if (!videoRef.current || !isVideoLoaded) return

    try {
      if (status && "isPlaying" in status && status.isPlaying) {
        await videoRef.current.pauseAsync()
      } else {
        await videoRef.current.playAsync()
      }
    } catch (error) {
      console.error("Error controlling video playback:", error)
    }
  }

  const handleMuteToggle = async () => {
    if (!videoRef.current || !isVideoLoaded) return

    try {
      await videoRef.current.setIsMutedAsync(!isMuted)
      setIsMuted(!isMuted)
    } catch (error) {
      console.error("Error toggling mute:", error)
    }
  }

  const handleRewind = async () => {
    if (!videoRef.current || !status || !("positionMillis" in status) || !isVideoLoaded) return

    try {
      const newPosition = Math.max(0, (status.positionMillis || 0) - 10000) // Rewind 10 seconds
      await videoRef.current.setPositionAsync(newPosition)
    } catch (error) {
      console.error("Error rewinding video:", error)
    }
  }

  const handleFastForward = async () => {
    if (!videoRef.current || !status || !("positionMillis" in status) || !("durationMillis" in status) || !isVideoLoaded) return

    try {
      const newPosition = Math.min(status.durationMillis || 0, (status.positionMillis || 0) + 10000) // Fast forward 10 seconds
      await videoRef.current.setPositionAsync(newPosition)
    } catch (error) {
      console.error("Error fast forwarding video:", error)
    }
  }

  const handleVideoPress = () => {
    setShowControls(!showControls)
  }

  const handleLoadStart = () => {
    setIsLoading(true)
    setHasError(false)
  }

  const handleLoad = async (loadStatus: AVPlaybackStatus) => {
    setIsLoading(false)
    setHasError(false)
    console.log("Video loaded successfully")
    
    // Set initial position if provided
    if (initialProgress > 0 && videoRef.current && "durationMillis" in loadStatus && loadStatus.durationMillis) {
      try {
        const initialPosition = (initialProgress / 100) * loadStatus.durationMillis
        await videoRef.current.setPositionAsync(initialPosition)
      } catch (error) {
        console.error("Error setting initial position:", error)
      }
    }
    
    // Auto-play if requested
    if (autoPlay && videoRef.current) {
      try {
        await videoRef.current.playAsync()
      } catch (error) {
        console.error("Error auto-playing video:", error)
      }
    }
  }

  const handleError = (error: string) => {
    console.error("Video loading error:", error)
    setIsLoading(false)
    setHasError(true)
    Alert.alert("Video Error", "Unable to load video. Please check your connection and try again.", [{ text: "OK" }])
  }

  const handlePlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    setStatus(playbackStatus)

    if (playbackStatus.error) {
      handleError(playbackStatus.error)
    }
  }

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  if (!videoUrl) {
    return (
      <View style={[styles.container, { height: containerHeight }]}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No video available</Text>
        </View>
      </View>
    )
  }

  if (hasError) {
    return (
      <View style={[styles.container, { height: containerHeight }]}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load video</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setHasError(false)
              setIsLoading(true)
              // Force video to reload
              if (videoRef.current) {
                cleanupVideo().then(() => {
                  if (videoRef.current && videoUrl) {
                    videoRef.current.loadAsync({ uri: videoUrl })
                  }
                })
              }
            }}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.container, { height: containerHeight }]}>
      <TouchableOpacity
        style={[styles.videoContainer, { width: width, height: containerHeight }]}
        onPress={handleVideoPress}
        activeOpacity={1}
      >
        <Video
          ref={videoRef}
          style={[styles.video, { width: width, height: containerHeight }]}
          source={{ uri: videoUrl }}
          useNativeControls={false}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={false} // We'll control play/pause manually
          isLooping={false}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          onLoadStart={handleLoadStart}
          onLoad={handleLoad}
          onError={(error) => handleError(error.error?.message || "Unknown error")}
        />

        {/* Loading Indicator */}
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.loadingText}>Loading video...</Text>
          </View>
        )}

        {/* Video Controls */}
        {showControls && !isLoading && !hasError && isVideoLoaded && (
          <View style={styles.controlsOverlay}>
            {/* Center Play/Pause Button */}
            <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
              {status && "isPlaying" in status && status.isPlaying ? (
                <Pause size={40} color="#ffffff" />
              ) : (
                <Play size={40} color="#ffffff" />
              )}
            </TouchableOpacity>

            {/* Bottom Controls */}
            <View style={styles.bottomControls}>
              <View style={styles.leftControls}>
                <TouchableOpacity style={styles.controlButton} onPress={handleRewind}>
                  <RotateCcw size={20} color="#ffffff" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlButton} onPress={handleFastForward}>
                  <SkipForward size={20} color="#ffffff" />
                </TouchableOpacity>
              </View>

              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>
                  {status && "positionMillis" in status ? formatTime(status.positionMillis || 0) : "0:00"} /{" "}
                  {status && "durationMillis" in status ? formatTime(status.durationMillis || 0) : "0:00"}
                </Text>
              </View>

              <View style={styles.rightControls}>
                <TouchableOpacity style={styles.controlButton} onPress={handleMuteToggle}>
                  {isMuted ? <VolumeX size={20} color="#ffffff" /> : <Volume2 size={20} color="#ffffff" />}
                </TouchableOpacity>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width:
                        status && "durationMillis" in status && "positionMillis" in status && status.durationMillis
                          ? `${(status.positionMillis / status.durationMillis) * 100}%`
                          : "0%",
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#000000",
    overflow: "hidden",
  },
  videoContainer: {
    backgroundColor: "#000000",
    overflow: "hidden",
  },
  video: {
    backgroundColor: "#000000",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#ffffff",
    marginTop: 12,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  errorText: {
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#001e70",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  controlsOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomControls: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftControls: {
    flexDirection: "row",
    gap: 12,
  },
  timeContainer: {
    flex: 1,
    alignItems: "center",
  },
  timeText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  rightControls: {
    flexDirection: "row",
    gap: 12,
  },
  controlButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 2,
  },
})