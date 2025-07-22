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
import { createOrUpdateUserProfile } from "../lib/user-utils"

WebBrowser.maybeCompleteAuthSession() // Must be outside component

const { width } = Dimensions.get("window")

export default function LoginScreen() {
    const [loading, setLoading] = useState(false)

    const handleContinue = () => {
        router.push('/orientation-check-in')
    }
    

    // Check for existing session on component mount
    useEffect(() => {
        checkExistingSession()
    }, [])

    const checkExistingSession = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession()
            if (session?.user) {
                console.log('Existing session found, navigating to next screen')
                router.push('/orientation-check-in')
            }
        } catch (error) {
            console.error('Error checking session:', error)
        }
    }

    const handleGoogleSignIn = async () => {
        console.log("Starting Google Sign-In process")
        setLoading(true)
        
        try {
            await GoogleSignin.hasPlayServices()
            
            // Sign out any existing user first to avoid token conflicts
            try {
                await GoogleSignin.signOut()
            } catch (signOutError) {
                console.log("No existing user to sign out")
            }
            
            const userInfo = await GoogleSignin.signIn()
            console.log("Google Sign-In successful:", userInfo)
            
            if (userInfo.data?.idToken) {
                console.log("Using ID token for Supabase authentication")
                
                // Use the ID token to sign in with Supabase
                const { data, error } = await supabase.auth.signInWithIdToken({
                    provider: 'google',
                    token: userInfo.data.idToken,
                })
                
                if (error) {
                    console.error("Supabase ID token auth error:", error)
                    throw error
                }
                
                console.log("Supabase authentication successful:", data)
                
                if (data.user) {
                    // Extract user information from Google Sign-In response
                    const googleUser = userInfo.data.user
                    const userProfile = {
                        id: data.user.id,
                        email: googleUser?.email || data.user.email || '',
                        full_name: googleUser?.name || `${googleUser?.givenName || ''} ${googleUser?.familyName || ''}`.trim(),
                        avatar_url: googleUser?.photo || '',
                    }
                    
                    console.log('Creating/updating user profile:', userProfile)
                    
                    const profileSuccess = await createOrUpdateUserProfile(userProfile)
                    
                    if (profileSuccess) {
                        console.log('User profile created/updated successfully')
                    } else {
                        console.error('Failed to create/update user profile')
                    }
                    
                    // Navigate to next screen
                    console.log('Authentication complete, navigating to orientation check-in')
                    router.push('/orientation-check-in')
                } else {
                    throw new Error('No user data returned from Supabase')
                }
            } else {
                throw new Error('No ID token received from Google Sign-In')
            }
            
        } catch (error: any) {
            console.error("Google Sign-In error:", error)
            
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("User cancelled the login flow")
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("Sign in operation already in progress")
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("Play services not available or outdated")
            } else {
                console.log("Authentication error:", error.message || error)
            }
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        // Configure Google Sign-In when component mounts
        GoogleSignin.configure({
            scopes: ['openid', 'profile', 'email'],
            webClientId: '39709221966-r79ob0j9499jd64ninbot3c1nf5ejl3q.apps.googleusercontent.com',
            iosClientId: '39709221966-us5m6f6fn75fhke5qba9vjmc98msrbkj.apps.googleusercontent.com',
            offlineAccess: false,
            forceCodeForRefreshToken: false, // Changed to false to get ID token
        })
    }, [])
    
    return (
        <ImageBackground
            source={require("../assets/images/login_backspash.png")}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
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
                                {/* Google Sign-In Button */}
                                <View style={styles.buttonWrapper}>
                                    <GoogleSigninButton
                                        size={GoogleSigninButton.Size.Wide}
                                        color={GoogleSigninButton.Color.Dark}
                                        style={styles.googleSigninButton}
                                        onPress={handleGoogleSignIn}
                                        disabled={loading}
                                    />
                                </View>
                
                                <TouchableOpacity
                                    onPress={handleContinue}
                                    disabled={loading}
                                >
                                    <Text style={[styles.tempButtonText, loading && styles.disabledText]}>
                                        Continue (Temporary)
                                    </Text>
                                </TouchableOpacity>
                                
                                <Text style={styles.helpText}>
                                    If you do not have a Norooz account, please contact admin.
                                </Text>
                            </View>
                        </CardContent>
                    </Card>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    backgroundImage: {
        flex: 1,
        height: "100%",
        width: "100%", },
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
    buttonWrapper: {
        width: "100%",
        alignItems: "center",
    },
    googleButton: {
        width: Math.min(width - 85, 280),
        height: 48,
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
    tempButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#007AFF",
        textAlign: "center",
    },
    googleSigninButton: {
        width: 200,
        height: 48,
    },
    disabledText: {
        opacity: 0.5,
    },
})
