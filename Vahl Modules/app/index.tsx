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
import { router } from "expo-router"
import { Card, CardContent } from "@/components/ui/Card"

const { width } = Dimensions.get("window")

export default function LoginScreen() {
  const handleSignIn = () => {
    router.push("/orientation-check-in")
  }

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
                resizeMode="contain" />

              <Text style={styles.heading}>Sign in with your Norooz account</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSignIn} style={styles.googleButton}>
                  <Text style={styles.buttonText}>SIGN IN WITH GOOGLE</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSignIn} style={styles.appleButton}>
                  <Text style={styles.buttonTextWhite}>SIGN IN WITH APPLE</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.helpText}>If you do not have a Norooz account, please contact admin.</Text>
            </CardContent>
          </Card>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
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
