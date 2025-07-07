/*
# Fix Storage Path Mismatch

This migration updates the video file paths in the database to match the actual storage structure.

## Changes
- Update video_file_path to use actual storage paths (with spaces, not URL encoded)
- Ensure paths match what's actually in Supabase storage
*/

-- Update video file paths to match actual storage structure (without URL encoding)
UPDATE module_videos 
SET video_file_path = CASE 
  WHEN id = '660e8400-e29b-41d4-a716-446655440001' THEN 'Module 1/Video1.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440002' THEN 'Module 1/Video12.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440003' THEN 'Module 1/Video24.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440004' THEN 'Module 1/Video28.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440005' THEN 'Module 7/Video29.mp4'
  ELSE video_file_path
END
WHERE id IN (
  '660e8400-e29b-41d4-a716-446655440001',
  '660e8400-e29b-41d4-a716-446655440002', 
  '660e8400-e29b-41d4-a716-446655440003',
  '660e8400-e29b-41d4-a716-446655440004',
  '660e8400-e29b-41d4-a716-446655440005'
);

-- Add any missing videos that should exist based on your storage
-- Module 1 additional videos
INSERT INTO module_videos (id, module_id, title, description, duration, video_file_path, order_number, transcript, documents, is_published)
VALUES
  (
    '660e8400-e29b-41d4-a716-446655440010',
    '550e8400-e29b-41d4-a716-446655440001',
    'Video 30',
    'Additional training content',
    '~5 mins',
    'Module 1/Video30.mp4',
    5,
    'Additional training content for Module 1.',
    'Additional resources and documentation',
    true
  ),
  (
    '660e8400-e29b-41d4-a716-446655440011',
    '550e8400-e29b-41d4-a716-446655440001',
    'Video 42',
    'Advanced training content',
    '~6 mins',
    'Module 1/Video42.mp4',
    6,
    'Advanced training content for Module 1.',
    'Advanced resources and documentation',
    true
  )
ON CONFLICT (id) DO NOTHING;

-- Add videos for other modules based on your storage structure
-- Module 2
INSERT INTO module_videos (id, module_id, title, description, duration, video_file_path, order_number, transcript, documents, is_published)
VALUES
  (
    '660e8400-e29b-41d4-a716-446655440012',
    '550e8400-e29b-41d4-a716-446655440002',
    'Module 2 Training',
    'Communication skills training',
    '~8 mins',
    'Module 2/Video30.mp4',
    3,
    'Communication skills and best practices.',
    'Communication guidelines and resources',
    true
  )
ON CONFLICT (id) DO NOTHING;

-- Module 3
INSERT INTO module_videos (id, module_id, title, description, duration, video_file_path, order_number, transcript, documents, is_published)
VALUES
  (
    '660e8400-e29b-41d4-a716-446655440013',
    '550e8400-e29b-41d4-a716-446655440003',
    'Module 3 Training',
    'Documentation procedures',
    '~7 mins',
    'Module 3/Video42.mp4',
    3,
    'Documentation and record keeping procedures.',
    'Documentation templates and guidelines',
    true
  )
ON CONFLICT (id) DO NOTHING;