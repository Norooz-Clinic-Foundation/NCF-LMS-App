import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
import { router, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { ArrowLeft, User, Video, Clock, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { GlobalTextStyles } from '../../../components/ui/GlobalStyles';
import { useVideoData } from '../../../hooks/useVideoData'; // Using real Supabase data
import { VideoPlayer } from '../../../components/video/VideoPlayer';
import { VideoTabs } from '../../../components/video/VideoTabs';

const { width, height } = Dimensions.get('window');

export default function VideoScreen() {
  const { moduleId, videoId } = useLocalSearchParams<{ moduleId: string; videoId: string }>();
  const { video, module, loading, error, updateProgress, navigateToVideo } = useVideoData(moduleId!, videoId!);
  const [activeTab, setActiveTab] = useState<'transcript' | 'documents'>('transcript');
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');
  const [isScreenFocused, setIsScreenFocused] = useState(true);

  // Track screen focus to stop video when navigating away
  useFocusEffect(
    React.useCallback(() => {
      console.log('Video screen focused');
      setIsScreenFocused(true);
      
      return () => {
        console.log('Video screen unfocused - stopping video');
        setIsScreenFocused(false);
        // Clear video URL to stop playback immediately
        setCurrentVideoUrl('');
      };
    }, [])
  );

  // Update video URL when video data changes and screen is focused
  useEffect(() => {
    if (video?.videoUrl && isScreenFocused) {
      console.log('Setting new video URL:', video.videoUrl);
      setCurrentVideoUrl(video.videoUrl);
    } else if (!isScreenFocused) {
      // Clear video URL when screen is not focused
      setCurrentVideoUrl('');
    }
  }, [video?.videoUrl, isScreenFocused]);

  const handleBack = () => {
    console.log('Back button pressed - stopping video and navigating to home');
    // Immediately stop video by clearing URL
    setCurrentVideoUrl('');
    setIsScreenFocused(false);
    
    // Small delay to ensure video stops before navigation
    setTimeout(() => {
      router.push('/(main)/home');
    }, 100);
  };

  const handleProfile = () => {
    // TODO: Navigate to profile screen
    console.log('Navigate to profile');
  };

  const handlePreviousVideo = async () => {
    if (video && module) {
      const currentIndex = module.videos?.findIndex(v => v.id === video.id) || 0;
      if (currentIndex > 0) {
        const previousVideo = module.videos![currentIndex - 1];
        console.log('Navigating to previous video:', previousVideo.id);
        
        // Clear current video URL first to stop playback
        setCurrentVideoUrl('');
        
        // Small delay to ensure video stops before navigation
        setTimeout(() => {
          navigateToVideo(previousVideo.id);
        }, 100);
      }
    }
  };

  const handleNextVideo = async () => {
    if (video && module) {
      const currentIndex = module.videos?.findIndex(v => v.id === video.id) || 0;
      if (currentIndex < (module.videos?.length || 0) - 1) {
        const nextVideo = module.videos![currentIndex + 1];
        console.log('Navigating to next video:', nextVideo.id);
        
        // Clear current video URL first to stop playback
        setCurrentVideoUrl('');
        
        // Small delay to ensure video stops before navigation
        setTimeout(() => {
          navigateToVideo(nextVideo.id);
        }, 100);
      }
    }
  };

  const getCurrentVideoIndex = () => {
    if (!video || !module?.videos) return { current: 1, total: 1 };
    const currentIndex = module.videos.findIndex(v => v.id === video.id);
    return {
      current: currentIndex + 1,
      total: module.videos.length
    };
  };

  const canNavigatePrevious = () => {
    if (!video || !module?.videos) return false;
    const currentIndex = module.videos.findIndex(v => v.id === video.id);
    return currentIndex > 0;
  };

  const canNavigateNext = () => {
    if (!video || !module?.videos) return false;
    const currentIndex = module.videos.findIndex(v => v.id === video.id);
    return currentIndex < module.videos.length - 1;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={[GlobalTextStyles.body, styles.loadingText]}>Loading video...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !video || !module) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={[GlobalTextStyles.h4, styles.errorTitle]}>Video Not Found</Text>
          <Text style={[GlobalTextStyles.body, styles.errorText]}>
            {error || 'The requested video could not be loaded.'}
          </Text>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>Go Back to Modules</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const videoIndex = getCurrentVideoIndex();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
          <ArrowLeft size={24} color="#2b2b2b" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={[GlobalTextStyles.h6, styles.moduleTitle]} numberOfLines={1}>
            {module.title}
          </Text>
          <Text style={[GlobalTextStyles.caption, styles.videoCounter]}>
            Video {videoIndex.current} of {videoIndex.total}
          </Text>
        </View>
        
        <TouchableOpacity onPress={handleProfile} style={styles.headerButton}>
          <User size={24} color="#2b2b2b" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Video Player */}
        <View style={styles.videoContainer}>
          <VideoPlayer
            videoUrl={currentVideoUrl}
            thumbnailUrl={module.thumbnailUrl}
            onProgress={updateProgress}
            autoPlay={true}
          />
        </View>

        {/* Video Info */}
        <View style={styles.videoInfo}>
          {/* Video Stats */}
          <View style={styles.videoStats}>
            <View style={styles.statItem}>
              <Video size={16} color="#666666" />
              <Text style={[GlobalTextStyles.caption, styles.statText]}>
                Video {videoIndex.current}/{videoIndex.total}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Clock size={16} color="#666666" />
              <Text style={[GlobalTextStyles.caption, styles.statText]}>
                {video.duration}
              </Text>
            </View>
          </View>

          {/* Video Title */}
          <Text style={[GlobalTextStyles.h4, styles.videoTitle]}>
            {video.title}
          </Text>

          {/* Tags */}
          {module.tags && module.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {module.tags.slice(0, 4).map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Video Description */}
          <Text style={[GlobalTextStyles.body, styles.videoDescription]}>
            {video.description || module.description}
          </Text>
        </View>

        {/* Tabs Section */}
        <VideoTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          transcriptContent={video.transcript}
          documentsContent={video.documents}
        />

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            onPress={handlePreviousVideo}
            disabled={!canNavigatePrevious()}
            style={[
              styles.navButton,
              styles.prevButton,
              !canNavigatePrevious() && styles.disabledButton
            ]}
          >
            <ChevronLeft 
              size={24} 
              color={canNavigatePrevious() ? "#ffffff" : "#cccccc"} 
            />
            <Text style={[
              styles.navButtonText,
              !canNavigatePrevious() && styles.disabledButtonText
            ]}>
              Previous
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNextVideo}
            disabled={!canNavigateNext()}
            style={[
              styles.navButton,
              styles.nextButton,
              !canNavigateNext() && styles.disabledButton
            ]}
          >
            <Text style={[
              styles.navButtonText,
              !canNavigateNext() && styles.disabledButtonText
            ]}>
              Next
            </Text>
            <ChevronRight 
              size={24} 
              color={canNavigateNext() ? "#ffffff" : "#cccccc"} 
            />
          </TouchableOpacity>
        </View>

        {/* Back to Module Button */}
        <View style={styles.backToModuleContainer}>
          <TouchableOpacity onPress={handleBack} style={styles.backToModuleButton}>
            <ArrowLeft size={20} color="#001e70" />
            <Text style={styles.backToModuleText}>Back to All Modules</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#fffbf8',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 30, 112, 0.1)',
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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  moduleTitle: {
    color: '#2b2b2b',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  videoCounter: {
    color: '#666666',
    fontWeight: '500',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 140, // Account for tab bar and navigation
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000000',
    marginBottom: 24,
  },
  videoInfo: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  videoStats: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    color: '#666666',
    fontWeight: '500',
  },
  videoTitle: {
    color: '#2b2b2b',
    marginBottom: 16,
    lineHeight: 28,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: '#4b5563',
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'Nunito-Medium' : 'Nunito-Medium',
  },
  videoDescription: {
    color: '#4a4a4a',
    lineHeight: 24,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 16,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  prevButton: {
    backgroundColor: '#001e70',
  },
  nextButton: {
    backgroundColor: '#001e70',
  },
  disabledButton: {
    backgroundColor: '#e5e7eb',
  },
  navButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Nunito-SemiBold' : 'Nunito-SemiBold',
  },
  disabledButtonText: {
    color: '#9ca3af',
  },
  backToModuleContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
  },
  backToModuleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(0, 30, 112, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 30, 112, 0.2)',
    gap: 8,
  },
  backToModuleText: {
    color: '#001e70',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Nunito-SemiBold' : 'Nunito-SemiBold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#4a4a4a',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorTitle: {
    color: '#dc2626',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorText: {
    color: '#4a4a4a',
    textAlign: 'center',
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: '#001e70',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Nunito-SemiBold' : 'Nunito-SemiBold',
  },
});