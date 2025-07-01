import { useState, useEffect } from 'react';
import type { OnboardingModule, ModuleVideo } from '../types/module';

// Mock data for demonstration - replace with actual Supabase integration
const mockVideos: ModuleVideo[] = [
  { id: '1', title: 'Introduction to Norooz Clinic', duration: '5 min', isCompleted: true, videoUrl: '', order: 1 },
  { id: '2', title: 'Our Mission and Values', duration: '3 min', isCompleted: true, videoUrl: '', order: 2 },
  { id: '3', title: 'Team Structure Overview', duration: '4 min', isCompleted: false, videoUrl: '', order: 3 },
  { id: '4', title: 'Getting Started Guide', duration: '6 min', isCompleted: false, videoUrl: '', order: 4 },
  { id: '5', title: 'Resources and Support', duration: '3 min', isCompleted: false, videoUrl: '', order: 5 },
  { id: '6', title: 'Next Steps', duration: '2 min', isCompleted: false, videoUrl: '', order: 6 },
  { id: '7', title: 'Q&A Session', duration: '8 min', isCompleted: false, videoUrl: '', order: 7 },
];

const mockModules: OnboardingModule[] = [
  {
    id: '1',
    title: 'Welcome to Norooz Clinic Foundation',
    description: 'Learn about our mission, values, and the important work we do in providing mental health services.',
    duration: '45 mins',
    progress: 100,
    isCompleted: true,
    isLocked: false,
    moduleNumber: 1,
    category: 'orientation',
    thumbnailUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Orientation', 'Welcome', 'Mission', 'Values', 'Overview'],
    videoCount: 7,
    videos: mockVideos,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Understanding Client Confidentiality',
    description: 'Essential training on HIPAA compliance, client privacy rights, and maintaining confidentiality.',
    duration: '35 mins',
    progress: 75,
    isCompleted: false,
    isLocked: false,
    moduleNumber: 2,
    category: 'training',
    thumbnailUrl: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['HIPAA', 'Privacy', 'Confidentiality', 'Legal', 'Compliance'],
    videoCount: 6,
    videos: mockVideos.slice(0, 6),
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    title: 'Crisis Intervention Protocols',
    description: 'Learn how to identify crisis situations, de-escalation techniques, and emergency procedures.',
    duration: '50 mins',
    progress: 0,
    isCompleted: false,
    isLocked: false,
    moduleNumber: 3,
    category: 'training',
    thumbnailUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Crisis', 'Emergency', 'De-escalation', 'Safety', 'Protocols'],
    videoCount: 8,
    videos: mockVideos.slice(0, 8),
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
  {
    id: '4',
    title: 'Documentation and Record Keeping',
    description: 'Best practices for maintaining accurate client records and treatment documentation.',
    duration: '30 mins',
    progress: 0,
    isCompleted: false,
    isLocked: true,
    moduleNumber: 4,
    category: 'training',
    thumbnailUrl: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Documentation', 'Records', 'Notes', 'Legal', 'Best Practices'],
    videoCount: 5,
    videos: mockVideos.slice(0, 5),
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z',
  },
];

export const useModules = () => {
  const [modules, setModules] = useState<OnboardingModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchModules = async () => {
    try {
      setError(null);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Replace with actual Supabase query
      // const { data, error } = await supabase
      //   .from('onboarding_modules')
      //   .select(`
      //     *,
      //     videos:module_videos(*)
      //   `)
      //   .order('module_number', { ascending: true });
      
      // if (error) throw error;
      
      setModules(mockModules);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch modules');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const refreshModules = async () => {
    setRefreshing(true);
    await fetchModules();
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return {
    modules,
    loading,
    error,
    refreshing,
    refreshModules,
  };
};