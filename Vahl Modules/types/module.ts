export interface OnboardingModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress: number;
  isCompleted: boolean;
  isLocked: boolean;
  moduleNumber: number;
  videoUrl?: string;
  quizUrl?: string;
  examUrl?: string;
  thumbnailUrl?: string;
  category: 'orientation' | 'training' | 'assessment' | 'certification';
  prerequisites?: string[];
  learningObjectives?: string[];
  tags?: string[];
  videoCount?: number;
  videos?: ModuleVideo[];
  createdAt: string;
  updatedAt: string;
}

export interface ModuleVideo {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  videoUrl: string;
  order: number;
  description?: string;
  transcript?: string;
  documents?: string;
}

export interface ModuleProgress {
  moduleId: string;
  userId: string;
  progress: number;
  isCompleted: boolean;
  lastAccessedAt: string;
  timeSpent: number;
  quizScore?: number;
  examScore?: number;
}

export interface VideoProgress {
  videoId: string;
  userId: string;
  progress: number;
  isCompleted: boolean;
  lastWatchedAt: string;
  timeWatched: number;
}