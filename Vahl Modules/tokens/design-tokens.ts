// Design tokens for React Native/Expo cross-platform compatibility
export const designTokens = {
  colors: {
    primary: "#001e70",
    background: "#fffbf8",
    border: "#e5e5e5",
    surface: "#ffffff",
    onSurface: "#000000",
    onBackground: "#001e70",
    inactive: "#999999",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 20,
    xl: 24,
  },
  typography: {
    label: {
      fontSize: 10,
      fontWeight: "400" as const,
      letterSpacing: 0.5,
      lineHeight: 12,
      fontFamily: "Nunito-Regular",
    },
  },
  layout: {
    tabBar: {
      width: "100%" as const,
      minHeight: 70,
      itemGap: 4,
      paddingTop: 8,
      paddingBottom: 4,
      paddingHorizontal: 8,
    },
  },
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
  },
  animation: {
    duration: {
      fast: 150,
      normal: 200,
      slow: 300,
    },
  },
} as const

export type DesignTokens = typeof designTokens
