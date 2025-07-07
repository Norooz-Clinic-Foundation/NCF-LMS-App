/*
# Update Video File Paths to Match Storage Structure

This migration updates all video file paths in the database to match the actual storage structure without spaces.

## Changes
- Update existing video paths from "Module 1" to "Module1" format
- Add new video entries for all videos visible in storage
- Create missing module entries for Modules 4-8
*/

-- Update all existing video file paths to remove spaces
UPDATE module_videos 
SET video_file_path = CASE 
  WHEN id = '660e8400-e29b-41d4-a716-446655440001' THEN 'Module1/Video1.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440002' THEN 'Module1/Video12.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440003' THEN 'Module1/Video24.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440004' THEN 'Module1/Video28.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440010' THEN 'Module1/Video30.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440011' THEN 'Module1/Video42.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440005' THEN 'Module7/Video29.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440012' THEN 'Module2/Video30.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440013' THEN 'Module3/Video42.mp4'
  ELSE video_file_path
END;

-- Add missing modules (4, 5, 6, 7, 8) based on your storage structure
INSERT INTO onboarding_modules (id, title, description, duration, module_number, category, tags, is_published)
VALUES 
  (
    '550e8400-e29b-41d4-a716-446655440004',
    'Module 4 Training',
    'Advanced training content for Module 4.',
    '30 mins',
    4,
    'training',
    ARRAY['module4', 'training', 'advanced'],
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440005',
    'Module 5 Training',
    'Advanced training content for Module 5.',
    '35 mins',
    5,
    'training',
    ARRAY['module5', 'training', 'advanced'],
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440006',
    'Module 6 Training',
    'Advanced training content for Module 6.',
    '40 mins',
    6,
    'training',
    ARRAY['module6', 'training', 'advanced'],
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440007',
    'Module 7 Training',
    'Advanced training content for Module 7.',
    '25 mins',
    7,
    'training',
    ARRAY['module7', 'training', 'advanced'],
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440008',
    'Module 8 Training',
    'Advanced training content for Module 8.',
    '20 mins',
    8,
    'training',
    ARRAY['module8', 'training', 'advanced'],
    true
  )
ON CONFLICT (id) DO NOTHING;

-- Add videos for Module 2
INSERT INTO module_videos (id, module_id, title, description, duration, video_file_path, order_number, transcript, documents, is_published)
VALUES
  (
    '660e8400-e29b-41d4-a716-446655440020',
    '550e8400-e29b-41d4-a716-446655440002',
    'Module 2 Video 12',
    'Communication training video',
    '~5 mins',
    'Module2/Video12.mp4',
    2,
    'Communication skills training content.',
    'Communication resources and guidelines',
    true
  )
ON CONFLICT (id) DO NOTHING;

-- Add videos for Module 3
INSERT INTO module_videos (id, module_id, title, description, duration, video_file_path, order_number, transcript, documents, is_published)
VALUES
  (
    '660e8400-e29b-41d4-a716-446655440021',
    '550e8400-e29b-41d4-a716-446655440003',
    'Module 3 Video 24',
    'Documentation procedures video',
    '~6 mins',
    'Module3/Video24.mp4',
    1,
    'Documentation and record keeping procedures.',
    'Documentation templates and best practices',
    true
  ),
  (
    '660e8400-e29b-41d4-a716-446655440022',
    '550e8400-e29b-41d4-a716-446655440003',
    'Module 3 Video 28',
    'Advanced documentation video',
    '~4 mins',
    'Module3/Video28.mp4',
    2,
    'Advanced documentation techniques.',
    'Advanced documentation resources',
    true
  )
ON CONFLICT (id) DO NOTHING;

-- Add videos for Module 4
INSERT INTO module_videos (id, module_id, title, description, duration, video_file_path, order_number, transcript, documents, is_published)
VALUES
  (
    '660e8400-e29b-41d4-a716-446655440023',
    '550e8400-e29b-41d4-a716-446655440004',
    'Module 4 Video 28',
    'Module 4 training video',
    '~7 mins',
    'Module4/Video28.mp4',
    1,
    'Module 4 training content.',
    'Module 4 resources and materials',
    true
  )
ON CONFLICT (id) DO NOTHING;

-- Add videos for Module 5
INSERT INTO module_videos (id, module_id, title, description, duration, video_file_path, order_number, transcript, documents, is_published)
VALUES
  (
    '660e8400-e29b-41d4-a716-446655440024',
    '550e8400-e29b-41d4-a716-446655440005',
    'Module 5 Video 30',
    'Module 5 training video',
    '~8 mins',
    'Module5/Video30.mp4',
    1,
    'Module 5 training content.',
    'Module 5 resources and materials',
    true
  )
ON CONFLICT (id) DO NOTHING;

-- Add videos for Module 6
INSERT INTO module_videos (id, module_id, title, description, duration, video_file_path, order_number, transcript, documents, is_published)
VALUES
  (
    '660e8400-e29b-41d4-a716-446655440025',
    '550e8400-e29b-41d4-a716-446655440006',
    'Module 6 Video 42',
    'Module 6 training video',
    '~6 mins',
    'Module6/Video42.mp4',
    1,
    'Module 6 training content.',
    'Module 6 resources and materials',
    true
  )
ON CONFLICT (id) DO NOTHING;

-- Update Module 7 to have the correct module reference (it was referencing a non-existent module)
UPDATE module_videos 
SET module_id = '550e8400-e29b-41d4-a716-446655440007'
WHERE id = '660e8400-e29b-41d4-a716-446655440005';