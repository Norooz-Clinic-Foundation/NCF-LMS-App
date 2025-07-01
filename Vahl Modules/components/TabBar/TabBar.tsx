import type React from "react"
import { View, StyleSheet } from "react-native"
import { designTokens } from "../../tokens/design-tokens"
import type { TabBarProps } from "./types"
import { TabBarItem } from "./TabBarItem"

export const TabBar: React.FC<TabBarProps> = ({ items, onTabPress, activeTabId, style, containerStyle }) => {
  const containerStyles = [styles.container, containerStyle]
  const tabBarStyles = [styles.tabBar, style]

  return (
    <View style={containerStyles}>
      <View style={tabBarStyles}>
        {items.map((item) => (
          <TabBarItem
            key={item.id}
            item={item}
            isActive={activeTabId === item.id}
            onPress={() => onTabPress?.(item.id, item.route)}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: designTokens.colors.background,
  },
  tabBar: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    backgroundColor: designTokens.colors.background,
    paddingTop: 4,
    paddingBottom: 10,
    paddingHorizontal: 0,
    minHeight: 70,
    height: 70,
  },
})
