"use client"

import { useState, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native"
import { router } from "expo-router"
import { ArrowLeft } from "lucide-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const { width, height } = Dimensions.get("window")
const CORRECT_CODE = "12345"
const isSmallDevice = height < 700
const isMediumDevice = height >= 700 && height < 850

export default function OrientationCheckInScreen() {
  const insets = useSafeAreaInsets()
  const [attendanceCode, setAttendanceCode] = useState(["", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const inputRefs = useRef<(TextInput | null)[]>([])

  const handleCodeChange = (value: string, index: number) => {
    // Only allow numeric input
    if (!/^\d*$/.test(value)) return

    const newCode = [...attendanceCode]
    newCode[index] = value
    setAttendanceCode(newCode)

    // Auto-focus next input if current input has value and there's a next input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyPress = (key: string, index: number) => {
    // Handle backspace to move to previous input
    if (key === "Backspace" && !attendanceCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = async () => {
    const code = attendanceCode.join("")

    if (code.length !== 5) {
      Alert.alert("Error", "Please enter all 5 digits")
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (code === CORRECT_CODE) {
        // Navigate directly without showing alert first
        router.push("/welcome")
      } else {
        Alert.alert("Error", "Your code is not correct! Please check with admin for the correct code.")
      }
      setLoading(false)
    }, 1000)
  }

  const handleBack = () => {
    router.back()
  }

  const isCodeComplete = attendanceCode.every((digit) => digit !== "")

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={[styles.header, { paddingTop: Math.max(insets.top, 12) }]}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color="#2b2b2b" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(insets.bottom, 20) }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: "25%" }]} />
            </View>
          </View>

          <View style={styles.mainContent}>
            <Image
              source={require("../assets/images/norooz_full_logo.png")}
              style={[
                styles.logo,
                {
                  marginBottom: isSmallDevice ? 20 : isMediumDevice ? 24 : 32,
                },
              ]}
              resizeMode="contain"
            />

            <Text
              style={[
                styles.heading,
                {
                  marginBottom: isSmallDevice ? 16 : isMediumDevice ? 20 : 24,
                  fontSize: isSmallDevice ? 20 : 22,
                },
              ]}
            >
              Orientation Check-In
            </Text>

            <View style={styles.descriptionContainer}>
              <Text
                style={[
                  styles.description,
                  {
                    fontSize: isSmallDevice ? 12 : 13,
                    lineHeight: isSmallDevice ? 16 : 18,
                    marginBottom: isSmallDevice ? 10 : 12,
                  },
                ]}
              >
                Please enter the code given to you during the in-person orientation.
              </Text>
              <Text
                style={[
                  styles.description,
                  {
                    fontSize: isSmallDevice ? 12 : 13,
                    lineHeight: isSmallDevice ? 16 : 18,
                  },
                ]}
              >
                You <Text style={styles.bold}>must attend</Text> the in-person orientation and verify attendance to
                access the onboarding modules and continue with your internship.
              </Text>
            </View>

            <View
              style={[
                styles.inputContainer,
                {
                  marginTop: isSmallDevice ? 20 : isMediumDevice ? 24 : 28,
                  marginBottom: isSmallDevice ? 24 : isMediumDevice ? 28 : 32,
                },
              ]}
            >
              <Text
                style={[
                  styles.inputLabel,
                  {
                    fontSize: isSmallDevice ? 13 : 14,
                    marginBottom: isSmallDevice ? 12 : 16,
                  },
                ]}
              >
                Attendance Code
              </Text>
              <View style={styles.codeInputContainer}>
                {attendanceCode.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    style={[
                      styles.codeInput,
                      digit && styles.codeInputFilled,
                      {
                        width: isSmallDevice ? 44 : 48,
                        height: isSmallDevice ? 44 : 48,
                        fontSize: isSmallDevice ? 18 : 20,
                      },
                    ]}
                    value={digit}
                    onChangeText={(value) => handleCodeChange(value, index)}
                    onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                    keyboardType="numeric"
                    maxLength={1}
                    textAlign="center"
                    selectTextOnFocus
                    autoFocus={index === 0}
                  />
                ))}
              </View>
            </View>
          </View>

          <View
            style={[
              styles.buttonContainer,
              {
                paddingTop: isSmallDevice ? 16 : 20,
                paddingBottom: isSmallDevice ? 8 : 12,
                marginTop: 20,
              },
            ]}
          >
            <TouchableOpacity
              onPress={handleVerify}
              disabled={!isCodeComplete || loading}
              style={[styles.verifyButton, (!isCodeComplete || loading) && styles.disabledButton]}
            >
              <Text style={styles.buttonText}>{loading ? "VERIFYING..." : "VERIFY"}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf8",
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 8,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
  },
  progressContainer: {
    width: "100%",
    marginBottom: isSmallDevice ? 16 : 20,
    marginTop: isSmallDevice ? 8 : 12,
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: "rgba(0, 30, 112, 0.1)",
    borderRadius: 4,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#001e70",
    borderRadius: 4,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: isSmallDevice ? 20 : isMediumDevice ? 30 : 40,
    minHeight: isSmallDevice ? 300 : 400,
  },
  logo: {
    width: Math.min(width * 0.6, 240),
    height: Math.min(width * 0.32, 130),
    maxHeight: isSmallDevice ? 100 : 130,
  },
  heading: {
    fontWeight: "800",
    fontFamily: Platform.OS === "ios" ? "Nunito-ExtraBold" : "Nunito-ExtraBold",
    color: "#2b2b2b",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  descriptionContainer: {
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  description: {
    fontFamily: Platform.OS === "ios" ? "Nunito-Regular" : "Nunito-Regular",
    color: "#4a4a4a",
    textAlign: "center",
    width: "100%",
  },
  bold: {
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "Nunito-SemiBold" : "Nunito-SemiBold",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  inputLabel: {
    fontWeight: "500",
    fontFamily: Platform.OS === "ios" ? "Nunito-SemiBold" : "Nunito-SemiBold",
    color: "#2b2b2b",
    textAlign: "center",
  },
  codeInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  codeInput: {
    borderWidth: 2,
    borderColor: "#e5e5e5",
    borderRadius: 8,
    fontWeight: "bold",
    color: "#2b2b2b",
    fontFamily: Platform.OS === "ios" ? "Nunito-ExtraBold" : "Nunito-ExtraBold",
    backgroundColor: "#ffffff",
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
    paddingTop: 0,
    paddingBottom: 0,
    lineHeight: 24,
  },
  codeInputFilled: {
    borderColor: "#001e70",
    backgroundColor: "#f8f9ff",
  },
  buttonContainer: {
    width: "100%",
  },
  verifyButton: {
    width: "100%",
    backgroundColor: "#001e70",
    paddingVertical: Platform.OS === "ios" ? 18 : 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#001e70",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: Platform.OS === "ios" ? "Nunito-Bold" : "Nunito-Bold",
    letterSpacing: 0.5,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
})
