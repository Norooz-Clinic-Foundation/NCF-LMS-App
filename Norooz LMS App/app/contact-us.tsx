import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { LogOut } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const isSmallDevice = height < 700;
const isMediumDevice = height >= 700 && height < 850;

export default function ContactUsScreen() {
  const insets = useSafeAreaInsets();
  
  const handleContinue = () => {
    router.push('/pre-orientation-checklist');
  };

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 12) }]}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <LogOut size={24} color="#2b2b2b" />
        </TouchableOpacity>
      </View>

      <View style={[styles.content, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '75%' }]} />
          </View>
        </View>

        <View style={styles.mainContent}>
          <Image
            source={require("../assets/images/contact_image.png")}
            style={[
              styles.welcomeImage,
              {
                marginBottom: isSmallDevice ? 24 : isMediumDevice ? 32 : 40,
              }
            ]}
            resizeMode="contain"
          />
          
          <Text style={[
            styles.heading,
            {
              marginBottom: isSmallDevice ? 20 : isMediumDevice ? 24 : 32,
              fontSize: isSmallDevice ? 28 : 32,
            }
          ]}>
            Contact Us
          </Text>

          <Text style={[
            styles.description,
            {
              fontSize: isSmallDevice ? 15 : 16,
              lineHeight: isSmallDevice ? 22 : 24,
            }
          ]}>
            If you can't find the answer to your question on the reference sheet, please check the reference tab to find the Clinic member who can help you with your question.
          </Text>
        </View>

        <View style={[
          styles.buttonContainer,
          {
            paddingTop: isSmallDevice ? 16 : 20,
            paddingBottom: isSmallDevice ? 8 : 12,
          }
        ]}>
          <TouchableOpacity
            onPress={handleContinue}
            style={styles.continueButton}
          >
            <Text style={styles.buttonText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbf8',
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 8,
    zIndex: 10,
  },
  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  progressContainer: {
    width: '100%',
    marginBottom: isSmallDevice ? 16 : 20,
    marginTop: isSmallDevice ? 8 : 12,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(0, 30, 112, 0.1)',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#001e70',
    borderRadius: 4,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: isSmallDevice ? 20 : isMediumDevice ? 30 : 40,
    minHeight: isSmallDevice ? 300 : 400,
  },
  welcomeImage: {
    width: Math.min(width * 0.75, 300),
    height: Math.min(width * 0.45, 180),
    maxHeight: isSmallDevice ? 150 : 200,
  },
  heading: {
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Nunito-ExtraBold' : 'Nunito-ExtraBold',
    color: '#2b2b2b',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  description: {
    fontFamily: Platform.OS === 'ios' ? 'Nunito-Regular' : 'Nunito-Regular',
    color: '#4a4a4a',
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#001e70',
    paddingVertical: Platform.OS === 'ios' ? 18 : 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#001e70',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Nunito-Bold' : 'Nunito-Bold',
    letterSpacing: 0.5,
  },
});