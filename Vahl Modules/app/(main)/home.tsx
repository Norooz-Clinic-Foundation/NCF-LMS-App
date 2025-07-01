import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { MainLayout } from '../../components/layout/MainLayout';
import { ModuleList } from '../../components/modules/ModuleList';
import { GlobalTextStyles } from '../../components/ui/GlobalStyles';
import { useModules } from '../../hooks/useModules';
import { ArrowLeft, User } from 'lucide-react-native';
import type { OnboardingModule } from '../../types/module';

export default function HomeScreen() {
  const { modules, loading, error, refreshing, refreshModules } = useModules();

  const handleModulePress = (module: OnboardingModule) => {
    if (module.isLocked) {
      Alert.alert(
        'Module Locked',
        'Complete the previous modules to unlock this one.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Navigate to first video in the module
    if (module.videos && module.videos.length > 0) {
      const firstVideo = module.videos[0];
      router.push(`/video/${module.id}/${firstVideo.id}`);
    } else {
      Alert.alert(
        'No Videos Available',
        'This module does not have any videos yet.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleProfile = () => {
    // TODO: Navigate to profile screen
    Alert.alert('Profile', 'Navigate to profile screen');
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
        <ArrowLeft size={24} color="#2b2b2b" />
      </TouchableOpacity>
      
      <Text style={[GlobalTextStyles.h4, styles.headerTitle]}>
        Onboarding Modules
      </Text>
      
      <TouchableOpacity onPress={handleProfile} style={styles.headerButton}>
        <User size={24} color="#2b2b2b" />
      </TouchableOpacity>
    </View>
  );

  if (loading && modules.length === 0) {
    return (
      <MainLayout activeTab="home">
        <View style={styles.container}>
          {renderHeader()}
          <View style={styles.loadingContainer}>
            <Text style={[GlobalTextStyles.body, styles.loadingText]}>
              Loading modules...
            </Text>
          </View>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout activeTab="home">
      <View style={styles.container}>
        {renderHeader()}
        
        <ScrollView 
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ModuleList
            modules={modules}
            onModulePress={handleModulePress}
            onRefresh={refreshModules}
            refreshing={refreshing}
            loading={loading}
            error={error}
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbf8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#fffbf8',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  headerTitle: {
    color: '#2b2b2b',
    fontWeight: '600',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Account for tab bar
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#4a4a4a',
  },
});