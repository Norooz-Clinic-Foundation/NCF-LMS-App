import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { LogOut } from 'lucide-react-native';
import { Card, CardContent } from '@/components/ui/Card';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const handleContinue = () => {
    router.push('/reference-sheet');
  };

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <LogOut size={24} color="#2b2b2b" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Card style={styles.card}>
          <CardContent style={styles.cardContent}>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '25%' }]} />
              </View>
            </View>

            <Image
              source={{ uri: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200' }}
              style={styles.welcomeImage}
              resizeMode="contain"
            />
            
            <Text style={styles.heading}>Welcome!</Text>

            <Text style={styles.description}>
              Thank you for being a part of Norooz Clinic Foundation. We are so ecstatic to take you through our onboarding process to help equip you to take on therapy clients.
            </Text>

            <TouchableOpacity
              onPress={handleContinue}
              style={styles.continueButton}
            >
              <Text style={styles.buttonText}>CONTINUE</Text>
            </TouchableOpacity>
          </CardContent>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f2',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: Math.min(width - 40, 350),
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 32,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e5e5',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#001e70',
    borderRadius: 4,
  },
  welcomeImage: {
    width: 240,
    height: 160,
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    fontFamily: 'Nunito-ExtraBold',
    color: '#2b2b2b',
    textAlign: 'center',
    marginBottom: 24,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#2b2b2b',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#001e70',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Nunito-SemiBold',
  },
});