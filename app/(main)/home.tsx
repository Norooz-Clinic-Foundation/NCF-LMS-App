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
import { useModules } from '../../hooks/useModules'; // Using real Supabase data
import { User } from 'lucide-react-native';
import type { OnboardingModule } from '../../types/module';

export default function HomeScreen() {
  const { modules, loading, error, refreshing, refreshModules } = useModules();

  const handleModulePress = (module: OnboardingModule) => {
    if (module.isLocked) {
      Alert.alert(
        'Module Locked',
        'Complete the previous module to unlock this one.',
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

  const handleProfile = () => {
    // TODO: Navigate to profile screen
    Alert.alert('Profile', 'Navigate to profile screen');
  };

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Empty view for spacing - no back button */}
      <View style={styles.headerSpacer} />
      
      <Text style={[GlobalTextStyles.h4, styles.headerTitle]}>
        Onboarding Modules
      </Text>
      
      <TouchableOpacity onPress={handleProfile} style={styles.headerButton}>
        <User size={24} color="#2b2b2b" />
      </TouchableOpacity>
    </View>
  );

  const renderProgressSummary = () => {
    const unlockedModules = modules.filter(m => !m.isLocked);
    const completedModules = modules.filter(m => m.isCompleted);
    const totalModules = modules.length;

    return (
      <View style={styles.progressSummary}>
        <Text style={[GlobalTextStyles.h5, styles.progressTitle]}>
          Your Progress
        </Text>
        <View style={styles.progressStats}>
          <View style={styles.progressStat}>
            <Text style={[GlobalTextStyles.h3, styles.progressNumber]}>
              {completedModules.length}
            </Text>
            <Text style={[GlobalTextStyles.bodySmall, styles.progressLabel]}>
              Completed
            </Text>
          </View>
          <View style={styles.progressStat}>
            <Text style={[GlobalTextStyles.h3, styles.progressNumber]}>
              {unlockedModules.length}
            </Text>
            <Text style={[GlobalTextStyles.bodySmall, styles.progressLabel]}>
              Available
            </Text>
          </View>
          <View style={styles.progressStat}>
            <Text style={[GlobalTextStyles.h3, styles.progressNumber]}>
              {totalModules}
            </Text>
            <Text style={[GlobalTextStyles.bodySmall, styles.progressLabel]}>
              Total
            </Text>
          </View>
        </View>
        
        {/* Overall Progress Bar */}
        <View style={styles.overallProgressContainer}>
          <View style={styles.overallProgressBar}>
            <View 
              style={[
                styles.overallProgressFill, 
                { width: `${totalModules > 0 ? (completedModules.length / totalModules) * 100 : 0}%` }
              ]} 
            />
          </View>
          <Text style={[GlobalTextStyles.caption, styles.overallProgressText]}>
            {totalModules > 0 ? Math.round((completedModules.length / totalModules) * 100) : 0}% Complete
          </Text>
        </View>
      </View>
    );
  };

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
          {modules.length > 0 && renderProgressSummary()}
          
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
  headerSpacer: {
    width: 40, // Same width as headerButton to maintain center alignment
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
  progressSummary: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressTitle: {
    color: '#2b2b2b',
    marginBottom: 16,
    textAlign: 'center',
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  progressStat: {
    alignItems: 'center',
  },
  progressNumber: {
    color: '#001e70',
    fontWeight: '800',
    marginBottom: 4,
  },
  progressLabel: {
    color: '#666666',
    textAlign: 'center',
  },
  overallProgressContainer: {
    alignItems: 'center',
  },
  overallProgressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginBottom: 8,
  },
  overallProgressFill: {
    height: '100%',
    backgroundColor: '#001e70',
    borderRadius: 4,
  },
  overallProgressText: {
    color: '#666666',
    fontWeight: '600',
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