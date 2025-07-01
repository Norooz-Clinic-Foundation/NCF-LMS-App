import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import type { OnboardingModule, ModuleVideo } from '../types/module';

// Extended video interface with additional fields for video page
interface ExtendedModuleVideo extends ModuleVideo {
  description?: string;
  transcript?: string;
  documents?: string;
}

// Mock video data - replace with actual Supabase integration
const mockVideoData: Record<string, ExtendedModuleVideo> = {
  '1': {
    id: '1',
    title: 'Introduction to Norooz Clinic',
    duration: '5 min',
    isCompleted: true,
    videoUrl: 'https://example.com/video1.mp4',
    order: 1,
    description: 'Welcome to Norooz Clinic Foundation. This introductory video will help you understand our mission, values, and the important work we do in providing mental health services to our community.',
    transcript: 'Welcome to Norooz Clinic Foundation. In this video, we will introduce you to our organization, our mission to provide accessible mental health care, and the values that guide our work every day. Our clinic was founded with the belief that everyone deserves access to quality mental health services, regardless of their background or circumstances.',
    documents: 'Related documents: Clinic Overview Handbook, Mission Statement, Values Guide, Organizational Chart, Contact Directory'
  },
  '2': {
    id: '2',
    title: 'Our Mission and Values',
    duration: '3 min',
    isCompleted: true,
    videoUrl: 'https://example.com/video2.mp4',
    order: 2,
    description: 'Learn about the core mission and values that drive everything we do at Norooz Clinic Foundation.',
    transcript: 'Our mission is to provide compassionate, culturally sensitive mental health care to underserved communities. We believe in treating each client with dignity, respect, and understanding.',
    documents: 'Related documents: Mission Statement, Core Values Document, Cultural Competency Guidelines'
  },
  '3': {
    id: '3',
    title: 'Team Structure Overview',
    duration: '4 min',
    isCompleted: false,
    videoUrl: 'https://example.com/video3.mp4',
    order: 3,
    description: 'Understand how our team is organized and the roles of different team members in providing comprehensive care.',
    transcript: 'Our team consists of licensed therapists, counselors, support staff, and administrative personnel, all working together to provide comprehensive mental health services.',
    documents: 'Related documents: Organizational Chart, Role Descriptions, Team Contact Information'
  },
};

export const useVideoData = (moduleId: string, videoId: string) => {
  const [video, setVideo] = useState<ExtendedModuleVideo | null>(null);
  const [module, setModule] = useState<OnboardingModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideoData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // TODO: Replace with actual Supabase queries
      // const { data: videoData, error: videoError } = await supabase
      //   .from('module_videos')
      //   .select('*')
      //   .eq('id', videoId)
      //   .single();

      // const { data: moduleData, error: moduleError } = await supabase
      //   .from('onboarding_modules')
      //   .select(`
      //     *,
      //     videos:module_videos(*)
      //   `)
      //   .eq('id', moduleId)
      //   .single();

      // Mock data for demonstration
      const videoData = mockVideoData[videoId];
      if (!videoData) {
        throw new Error('Video not found');
      }

      // Get module data from the existing hook (simplified for demo)
      const mockModule: OnboardingModule = {
        id: moduleId,
        title: 'Welcome to Norooz Clinic Foundation',
        description: 'Learn about our mission, values, and the important work we do.',
        duration: '45 mins',
        progress: 100,
        isCompleted: true,
        isLocked: false,
        moduleNumber: 1,
        category: 'orientation',
        thumbnailUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['Orientation', 'Welcome', 'Mission', 'Values', 'Overview'],
        videoCount: 7,
        videos: Object.values(mockVideoData),
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };

      setVideo(videoData);
      setModule(mockModule);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch video data');
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (progress: number) => {
    try {
      // TODO: Update progress in database
      // await supabase
      //   .from('video_progress')
      //   .upsert({
      //     user_id: userId,
      //     video_id: videoId,
      //     progress: progress,
      //     last_watched_at: new Date().toISOString()
      //   });

      console.log(`Video progress updated: ${progress}%`);
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
  };

  const navigateToVideo = (newVideoId: string) => {
    router.push(`/video/${moduleId}/${newVideoId}`);
  };

  useEffect(() => {
    if (moduleId && videoId) {
      fetchVideoData();
    }
  }, [moduleId, videoId]);

  return {
    video,
    module,
    loading,
    error,
    updateProgress,
    navigateToVideo,
    refetch: fetchVideoData,
  };
};