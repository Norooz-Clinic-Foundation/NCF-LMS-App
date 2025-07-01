"use client"

import { useEffect } from "react"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useFonts } from "expo-font"
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito"
import * as SplashScreen from "expo-splash-screen"
import { useFrameworkReady } from "@/hooks/useFrameworkReady"

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  useFrameworkReady()

  const [fontsLoaded, fontError] = useFonts({
    "Nunito-Regular": Nunito_400Regular,
    "Nunito-Medium": Nunito_500Medium,
    "Nunito-SemiBold": Nunito_600SemiBold,
    "Nunito-Bold": Nunito_700Bold,
    "Nunito-ExtraBold": Nunito_800ExtraBold,
  })

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="orientation-check-in" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="reference-sheet" />
        <Stack.Screen name="contact-us" />
        <Stack.Screen name="pre-orientation-checklist" />
        <Stack.Screen name="onboarding/onboarding" />
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  )
}
