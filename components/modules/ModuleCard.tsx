import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { Play, Lock, CircleCheck as CheckCircle, Clock, Video, User } from 'lucide-react-native';
import { GlobalTextStyles } from '../ui/GlobalStyles';
import type { OnboardingModule } from '../../types/module';

interface ModuleCardProps {
  module: OnboardingModule;
  onPress: (module: OnboardingModule) => void;
  style?: any;
}

const { width } = Dimensions.get('window');
const cardWidth = width - 48;

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onPress, style }) => {
  const getStatusConfig = () => {
    if (module.isLocked) {
      return {
        backgroundColor: '#9ca3af',
        icon: <Lock size={20} color="#ffffff" />,
        text: 'Locked',
        textColor: '#ffffff'
      };
    }
    if (module.isCompleted) {
      return {
        backgroundColor: '#22c55e',
        icon: <CheckCircle size={20} color="#ffffff" />,
        text: 'Completed',
        textColor: '#ffffff'
      };
    }
    if (module.progress > 0) {
      return {
        backgroundColor: '#f59e0b',
        icon: <Play size={20} color="#ffffff" />,
        text: 'In Progress',
        textColor: '#ffffff'
      };
    }
    return {
      backgroundColor: '#001e70',
      icon: <Play size={20} color="#ffffff" />,
      text: 'Start Module',
      textColor: '#ffffff'
    };
  };

  const statusConfig = getStatusConfig();

  return (
    <TouchableOpacity
      style={[
        styles.card, 
        module.isLocked && styles.lockedCard,
        style
      ]}
      onPress={() => !module.isLocked && onPress(module)}
      disabled={module.isLocked}
      activeOpacity={module.isLocked ? 1 : 0.8}
    >
      {/* Locked Overlay */}
      {module.isLocked && (
        <View style={styles.lockedOverlay}>
          <Lock size={32} color="#ffffff" />
          <Text style={styles.lockedText}>Complete Previous Module</Text>
        </View>
      )}

      {/* Status Header */}
      <View style={[styles.statusHeader, { backgroundColor: statusConfig.backgroundColor }]}>
        {statusConfig.icon}
        <Text style={[styles.statusText, { color: statusConfig.textColor }]}>
          {statusConfig.text}
        </Text>
      </View>

      {/* Main Content */}
      <View style={[styles.content, module.isLocked && styles.lockedContent]}>
        {/* Module Info Section */}
        <View style={styles.moduleInfo}>
          <View style={styles.thumbnailContainer}>
            {module.thumbnailUrl && !module.isLocked ? (
              <Image
                source={{ uri: module.thumbnailUrl }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.thumbnailPlaceholder, module.isLocked && styles.lockedThumbnail]}>
                {module.isLocked ? (
                  <Lock size={24} color="#9ca3af" />
                ) : (
                  <Video size={24} color="#666666" />
                )}
              </View>
            )}
          </View>

          <View style={styles.moduleDetails}>
            <Text style={[
              GlobalTextStyles.h5, 
              styles.moduleTitle,
              module.isLocked && styles.lockedText
            ]} numberOfLines={3}>
              {module.title}
            </Text>
            
            {/*
            <Text style={[
              GlobalTextStyles.bodySmall, 
              styles.moduleDescription,
              module.isLocked && styles.lockedDescription
            ]} numberOfLines={1}>
              {module.isLocked ? 'Complete the previous module to unlock this content.' : module.description}
            </Text>
            */}
            
          </View>
        </View>

        {/* Tags Section - Hidden when locked */}
        {!module.isLocked && module.tags && module.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {module.tags.slice(0, 5).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Video size={16} color={module.isLocked ? "#9ca3af" : "#666666"} />
            <Text style={[
              GlobalTextStyles.caption, 
              styles.statText,
              module.isLocked && styles.lockedStatText
            ]}>
              {module.isLocked ? '? Videos' : `${module.videoCount || 0} Videos`}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Clock size={16} color={module.isLocked ? "#9ca3af" : "#666666"} />
            <Text style={[
              GlobalTextStyles.caption, 
              styles.statText,
              module.isLocked && styles.lockedStatText
            ]}>
              {module.isLocked ? '? mins' : module.duration}
            </Text>
          </View>
        </View>

        {/* Videos List - Hidden when locked */}
        {!module.isLocked && module.videos && module.videos.length > 0 && (
          <View style={styles.videosSection}>
            {module.videos.slice(0, 7).map((video, index) => (
              <View key={video.id} style={styles.videoItem}>
                <CheckCircle 
                  size={16} 
                  color={video.isCompleted ? "#22c55e" : "#e5e5e5"} 
                />
                <Text 
                  style={[
                    GlobalTextStyles.bodySmall, 
                    styles.videoTitle,
                    video.isCompleted && styles.completedVideo
                  ]} 
                  numberOfLines={2}
                >
                  {video.title}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Progress Bar (for in-progress modules) */}
        {!module.isLocked && module.progress > 0 && !module.isCompleted && (
          <View style={styles.progressSection}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${module.progress}%` }
                ]} 
              />
            </View>
            <Text style={[GlobalTextStyles.caption, styles.progressText]}>
              {module.progress}%
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
    width: cardWidth,
    position: 'relative',
  },
  lockedCard: {
    backgroundColor: '#f8f9fa',
    shadowOpacity: 0.05,
    elevation: 2,
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(156, 163, 175, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderRadius: 16,
  },
  lockedText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Nunito-SemiBold' : 'Nunito-SemiBold',
    marginTop: 8,
    textAlign: 'center',
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Nunito-SemiBold' : 'Nunito-SemiBold',
  },
  content: {
    padding: 20,
  },
  lockedContent: {
    opacity: 0.6,
  },
  moduleInfo: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  thumbnailContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  thumbnailPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedThumbnail: {
    backgroundColor: '#e5e7eb',
  },
  moduleDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  moduleTitle: {
    color: '#2b2b2b',
    marginBottom: 8,
    lineHeight: 24,
  },
  moduleDescription: {
    color: '#666666',
    lineHeight: 20,
  },
  lockedDescription: {
    color: '#9ca3af',
    fontStyle: 'italic',
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
  statsContainer: {
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
  lockedStatText: {
    color: '#9ca3af',
  },
  videosSection: {
    marginBottom: 16,
  },
  videoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  videoTitle: {
    flex: 1,
    color: '#2b2b2b',
  },
  completedVideo: {
    color: '#22c55e',
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#001e70',
    borderRadius: 4,
  },
  progressText: {
    color: '#666666',
    fontWeight: '600',
    minWidth: 35,
  },
});