"use client"

import { useState, useEffect } from "react"
import { mockModules, getModuleById, getVideoById, updateVideoProgress as updateMockProgress } from "../data/mockModules"
import type { OnboardingModule } from "../types/module"

export const useMockModules = () => {
  const [modules, setModules] = useState<OnboardingModule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchModules = async () => {
    try {
      setError(null)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log("Loading mock modules...")
      setModules([...mockModules])
      console.log(`Loaded ${mockModules.length} mock modules`)
    } catch (err) {
      console.error("Error loading mock modules:", err)
      setError(err instanceof Error ? err.message : "Failed to load modules")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const refreshModules = async () => {
    setRefreshing(true)
    await fetchModules()
  }

  const updateProgress = (moduleId: string, videoId: string, progress: number) => {
    const success = updateMockProgress(moduleId, videoId, progress)
    if (success) {
      // Trigger a re-render by updating the state
      setModules([...mockModules])
    }
    return success
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
    updateProgress,
    getModuleById,
    getVideoById,
  }
}