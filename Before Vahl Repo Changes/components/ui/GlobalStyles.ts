import { StyleSheet } from 'react-native';

// Global text styles using Nunito font family
export const GlobalTextStyles = StyleSheet.create({
  // Base text styles
  regular: {
    fontFamily: 'Nunito-Regular',
  },
  medium: {
    fontFamily: 'Nunito-Medium',
  },
  semiBold: {
    fontFamily: 'Nunito-SemiBold',
  },
  bold: {
    fontFamily: 'Nunito-Bold',
  },
  extraBold: {
    fontFamily: 'Nunito-ExtraBold',
  },

  // Typography scale with Nunito
  h1: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 32,
    lineHeight: 40,
  },
  h2: {
    fontFamily: 'Nunito-Bold',
    fontSize: 28,
    lineHeight: 36,
  },
  h3: {
    fontFamily: 'Nunito-Bold',
    fontSize: 24,
    lineHeight: 32,
  },
  h4: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 20,
    lineHeight: 28,
  },
  h5: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    lineHeight: 24,
  },
  h6: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    lineHeight: 22,
  },

  // Body text styles
  bodyLarge: {
    fontFamily: 'Nunito-Regular',
    fontSize: 18,
    lineHeight: 27,
  },
  body: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    lineHeight: 21,
  },

  // Caption and label styles
  caption: {
    fontFamily: 'Nunito-Medium',
    fontSize: 12,
    lineHeight: 18,
  },
  label: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    lineHeight: 20,
  },

  // Button text styles
  buttonLarge: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    lineHeight: 20,
  },
  button: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    lineHeight: 18,
  },
  buttonSmall: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 12,
    lineHeight: 16,
  },
});

// Helper function to apply global font to any text style
export const withGlobalFont = (style: any, fontWeight: 'regular' | 'medium' | 'semiBold' | 'bold' | 'extraBold' = 'regular') => {
  const fontFamilyMap = {
    regular: 'Nunito-Regular',
    medium: 'Nunito-Medium',
    semiBold: 'Nunito-SemiBold',
    bold: 'Nunito-Bold',
    extraBold: 'Nunito-ExtraBold',
  };

  return {
    ...style,
    fontFamily: fontFamilyMap[fontWeight],
  };
};