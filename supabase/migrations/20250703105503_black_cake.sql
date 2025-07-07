/*
# Add Video Tables for Onboarding System

This migration adds the missing tables for the video system based on your existing user_profiles table.

## New Tables
1. `onboarding_modules` - Training modules
2. `module_videos` - Videos within modules
3. `video_progress` - User progress tracking

## Security
- Enable RLS on all tables
- Add policies for authenticated users
*/

-- Create onboarding_modules table
CREATE TABLE IF NOT EXISTS onboarding_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  duration text DEFAULT '0 mins',
  module_number integer NOT NULL,
  category text CHECK (category IN ('orientation', 'training', 'assessment', 'certification')) DEFAULT 'training',
  thumbnail_url text,
  tags text[] DEFAULT '{}',
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create module_videos table
CREATE TABLE IF NOT EXISTS module_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid REFERENCES onboarding_modules(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  duration text DEFAULT '0 min',
  video_file_path text, -- Path in Supabase storage
  order_number integer DEFAULT 1,
  transcript text,
  documents text,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create video_progress table
CREATE TABLE IF NOT EXISTS video_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  video_id uuid REFERENCES module_videos(id) ON DELETE CASCADE,
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  is_completed boolean DEFAULT false,
  last_watched_at timestamptz DEFAULT now(),
  time_watched integer DEFAULT 0, -- in seconds
  UNIQUE(user_id, video_id)
);

-- Enable RLS
ALTER TABLE onboarding_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for onboarding_modules
CREATE POLICY "Anyone can read published modules"
  ON onboarding_modules
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated users can read all modules"
  ON onboarding_modules
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for module_videos
CREATE POLICY "Anyone can read published videos"
  ON module_videos
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated users can read all videos"
  ON module_videos
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for video_progress
CREATE POLICY "Users can read own progress"
  ON video_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON video_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON video_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_modules_number ON onboarding_modules(module_number);
CREATE INDEX IF NOT EXISTS idx_videos_module ON module_videos(module_id);
CREATE INDEX IF NOT EXISTS idx_videos_order ON module_videos(order_number);
CREATE INDEX IF NOT EXISTS idx_progress_user ON video_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_video ON video_progress(video_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_onboarding_modules_updated_at
  BEFORE UPDATE ON onboarding_modules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_module_videos_updated_at
  BEFORE UPDATE ON module_videos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();