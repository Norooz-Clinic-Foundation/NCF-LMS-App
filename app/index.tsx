import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from "react-native"
import { router } from 'expo-router'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import * as WebBrowser from "expo-web-browser"
import * as AuthSession from "expo-auth-session"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { Card, CardContent } from "@/components/ui/Card"

WebBrowser.maybeCompleteAuthSession() // Must be outside component

const { width } = Dimensions.get("window")

export default function LoginScreen() {
  const handleContinue = () => {
    router.push('/orientation-check-in')
  }

  // const [loading, setLoading] = useState(false)

  // const redirectUri = AuthSession.makeRedirectUri({
  //   scheme: Platform.OS === 'web' ? undefined : "com.googleusercontent.apps.39709221966-us5m6f6fn75fhke5qba9vjmc98msrbkj",
  // })
  // console.log("Redirect URI", redirectUri)
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   iosClientId: "39709221966-us5m6f6fn75fhke5qba9vjmc98msrbkj.apps.googleusercontent.com",
  //   androidClientId: "39709221966-1tgho3h7j61bcbdrdjgd8ll0b3lsq2m7.apps.googleusercontent.com",
  //   webClientId: "39709221966-r79ob0j9499jd64ninbot3c1nf5ejl3q.apps.googleusercontent.com",
  //   redirectUri,
  // })

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { idToken } = response.authentication!
  //     if (idToken) {
  //       supabase.auth
  //         .signInWithIdToken({
  //           provider: "google",
  //           token: idToken,
  //         })
  //         .then(({ data, error }) => {
  //           if (error) console.error("Supabase error:", error)
  //           else router.push('/orientation-check-in')
  //         })
  //     }
  //   }
  // }, [response])
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: '39709221966-us5m6f6fn75fhke5qba9vjmc98msrbkj.apps.googleusercontent.com',
    iosClientId: '39709221966-us5m6f6fn75fhke5qba9vjmc98msrbkj.apps.googleusercontent.com',
  })
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/images/login_backspash.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <Card style={styles.card}>
            <CardContent style={styles.cardContent}>
              <Image
                source={require("../assets/images/norooz_logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.heading}>Sign in with your Norooz account</Text>
              
              <View style={styles.buttonContainer}>
                <GoogleSigninButton
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={async () => {
                    console.log("Calling Google Button Test")
                    try {
                      await GoogleSignin.hasPlayServices()
                      const userInfo = await GoogleSignin.signIn()
                      if (userInfo.data?.idToken) {
                        const { data, error } = await supabase.auth.signInWithIdToken({
                          provider: 'google',
                          token: userInfo.data.idToken,
                        })
                        console.log(error, data)
                      } else {
                        throw new Error('no ID token present!')
                      }
                    } catch (error: any) {
                      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                        // user cancelled the login flow
                      } else if (error.code === statusCodes.IN_PROGRESS) {
                        // operation (e.g. sign in) is in progress already
                      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                        // play services not available or outdated
                      } else {
                        // some other error happened
                      }
                    }
                  }}
                />
              </View>

              <Text style={styles.helpText}>
                If you do not have a Norooz account, please contact admin.
              </Text>
            </CardContent>
          </Card>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: Math.min(width - 40, 320),
  },
  cardContent: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  logo: {
    width: 150,
    height: 81,
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    fontFamily: Platform.OS === "ios" ? "Nunito-ExtraBold" : "Nunito-ExtraBold",
    color: "#2b2b2b",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 32,
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
    marginBottom: 24,
  },
  googleButton: {
    width: "100%",
    backgroundColor: "#001e70",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  appleButton: {
    width: "100%",
    backgroundColor: "#000000",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "Nunito-SemiBold" : "Nunito-SemiBold",
  },
  buttonTextWhite: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "Nunito-SemiBold" : "Nunito-SemiBold",
  },
  helpText: {
    fontSize: 12,
    fontFamily: Platform.OS === "ios" ? "Nunito-Regular" : "Nunito-Regular",
    color: "#2b2b2b",
    textAlign: "center",
    lineHeight: 16,
  },
})
