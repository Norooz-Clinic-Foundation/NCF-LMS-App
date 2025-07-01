import type React from "react"
import { View, StyleSheet, SafeAreaView } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { TabBar } from "../TabBar"
import { tabItems } from "../../data/tabItems"
import { useTabBar } from "../../hooks/useTabBar"

interface MainLayoutProps {
  children: React.ReactNode
  activeTab: string
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, activeTab }) => {
  const insets = useSafeAreaInsets()
  const { handleTabPress } = useTabBar(activeTab)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{children}</View>
      <View style={[styles.tabBarContainer, { paddingBottom: Math.max(insets.bottom, 8) }]}>
        <TabBar items={tabItems} activeTabId={activeTab} onTabPress={handleTabPress} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf8",
  },
  content: {
    flex: 1,
  },
  tabBarContainer: {
    minheight: 65,
    height: 65,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 30, 112, 0.1)",
    backgroundColor: "#fffbf8",
  },
})
