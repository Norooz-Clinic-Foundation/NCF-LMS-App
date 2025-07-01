"use client"

import { useState, useCallback } from "react"
import { router } from "expo-router"

export interface UseTabBarReturn {
  activeTabId: string
  setActiveTab: (tabId: string) => void
  handleTabPress: (tabId: string, route: string) => void
}

export const useTabBar = (initialTabId = "home"): UseTabBarReturn => {
  const [activeTabId, setActiveTabId] = useState<string>(initialTabId)

  const setActiveTab = useCallback((tabId: string) => {
    setActiveTabId(tabId)
  }, [])

  const handleTabPress = useCallback(
    (tabId: string, route: string) => {
      // Don't navigate if already on the same tab
      if (activeTabId === tabId) return

      setActiveTab(tabId)

      // Small delay to allow tab animation to start before navigation
      setTimeout(() => {
        router.push(route as any)
      }, 50)

      console.log(`Tab pressed: ${tabId}, navigating to: ${route}`)
    },
    [setActiveTab, activeTabId],
  )

  return {
    activeTabId,
    setActiveTab,
    handleTabPress,
  }
}
