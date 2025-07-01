"use client"

import React from "react"
import type { ReactElement } from "react"
import { TouchableOpacity, StyleSheet, Animated, Text, View } from "react-native"
import { designTokens } from "../../tokens/design-tokens"
import type { TabBarItemProps } from "./types"
import { useEffect, useRef } from "react"

export const TabBarItem: React.FC<TabBarItemProps> = ({ item, isActive, onPress, style, labelStyle }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current
  const colorAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current
  const bounceAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Smooth color transition
    Animated.timing(colorAnim, {
      toValue: isActive ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()

    // Bounce animation when becoming active
    if (isActive) {
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [isActive])

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  const handlePress = () => {
    onPress?.()
  }

  const itemStyles = [
    styles.container,
    {
      transform: [
        { scale: scaleAnim },
        {
          translateY: bounceAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -2],
          }),
        },
      ],
    },
    style,
  ]

  const textStyles = [
    styles.label,
    {
      color: isActive ? designTokens.colors.primary : designTokens.colors.inactive,
      fontWeight: isActive ? "600" : "400",
    },
    labelStyle,
  ]

  // Create a wrapper for the icon with proper color
  const IconWrapper = () => {
    // Clone the icon with the appropriate color
    const iconColor = isActive ? designTokens.colors.primary : designTokens.colors.inactive

    if (React.isValidElement(item.icon)) {
      return React.cloneElement(item.icon as ReactElement, {
        color: iconColor,
        size: 24,
      })
    }

    return <View>{item.icon}</View>
  }

  return (
    <TouchableOpacity
      style={itemStyles}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={item.label}
      accessibilityState={{ selected: isActive }}
    >
      <Animated.View
        style={[
          styles.iconContainer,
          {
            transform: [{ scale: isActive ? 1.1 : 1 }],
          },
        ]}
      >
        <IconWrapper />
      </Animated.View>
      <Text style={textStyles}>{item.label}</Text>

      {/* Active indicator dot */}
      {isActive && (
        <Animated.View
          style={[
            styles.activeIndicator,
            {
              opacity: colorAnim,
              transform: [{ scale: colorAnim }],
            },
          ]}
        />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
    minHeight: 60,
    position: "relative",
  },
  iconContainer: {
    marginBottom: 4,
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
  },
  label: {
    fontSize: 10,
    letterSpacing: 0.5,
    lineHeight: 12,
    textAlign: "center",
    fontFamily: designTokens.typography.label.fontFamily,
  },
  activeIndicator: {
    position: "absolute",
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: designTokens.colors.primary,
  },
})
