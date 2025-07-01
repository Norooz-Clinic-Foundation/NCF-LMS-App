import type { ReactNode } from "react"
import type { ViewStyle, TextStyle } from "react-native"

export interface TabItem {
  id: string
  icon: ReactNode
  label: string
  isActive?: boolean
  route: string
}

export interface TabBarProps {
  items: TabItem[]
  onTabPress?: (tabId: string, route: string) => void
  activeTabId?: string
  style?: ViewStyle
  containerStyle?: ViewStyle
}

export interface TabBarItemProps {
  item: TabItem
  isActive: boolean
  onPress?: () => void
  style?: ViewStyle
  labelStyle?: TextStyle
}
