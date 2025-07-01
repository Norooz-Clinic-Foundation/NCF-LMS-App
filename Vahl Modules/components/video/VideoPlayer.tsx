import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { Play, Pause } from 'lucide-react-native';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl?: string;
  onProgress?: (progress: number) => void;
  autoPlay?: boolean;
  startTime?: number;
}

const { width } = Dimensions.get('window');

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  thumbnailUrl,
  onProgress,
  autoPlay = false,
  startTime = 0,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);

  // For web platform, we'll use a placeholder since video playback requires additional setup
  const isWeb = Platform.OS === 'web';

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // TODO: Implement actual video play/pause logic
    console.log(isPlaying ? 'Pausing video' : 'Playing video');
  };

  const handleProgress = (newProgress: number) => {
    setProgress(newProgress);
    onProgress?.(newProgress);
  };

  useEffect(() => {
    // Simulate video progress for demo
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = Math.min(prev + 1, 100);
          onProgress?.(newProgress);
          if (newProgress >= 100) {
            setIsPlaying(false);
          }
          return newProgress;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, onProgress]);

  return (
    <View style={styles.container}>
      {/* Video/Thumbnail Display */}
      <View style={styles.videoArea}>
        {thumbnailUrl && !isPlaying ? (
          <Image
            source={{ uri: thumbnailUrl }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.videoPlaceholder}>
            {/* Placeholder pattern for video */}
            <View style={styles.checkerboard}>
              {Array.from({ length: 12 }, (_, row) =>
                Array.from({ length: 20 }, (_, col) => (
                  <View
                    key={`${row}-${col}`}
                    style={[
                      styles.checkerSquare,
                      (row + col) % 2 === 0 ? styles.checkerLight : styles.checkerDark,
                    ]}
                  />
                ))
              )}
            </View>
          </View>
        )}

        {/* Play/Pause Overlay */}
        {showControls && (
          <TouchableOpacity
            style={styles.playButton}
            onPress={handlePlayPause}
            activeOpacity={0.8}
          >
            <View style={styles.playButtonBackground}>
              {isPlaying ? (
                <Pause size={32} color="#ffffff" />
              ) : (
                <Play size={32} color="#ffffff" />
              )}
            </View>
          </TouchableOpacity>
        )}

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${progress}%` }
              ]} 
            />
          </View>
        </View>
      </View>

      {/* Web Platform Notice */}
      {isWeb && (
        <View style={styles.webNotice}>
          {/* This would be replaced with actual video player implementation */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000000',
    position: 'relative',
  },
  videoArea: {
    flex: 1,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f3f4f6',
  },
  checkerboard: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkerSquare: {
    width: width / 20,
    height: (width * 9/16) / 12,
  },
  checkerLight: {
    backgroundColor: '#e5e7eb',
  },
  checkerDark: {
    backgroundColor: '#d1d5db',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -32 }, { translateY: -32 }],
  },
  playButtonBackground: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 30, 112, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#001e70',
    borderRadius: 2,
  },
  webNotice: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
});