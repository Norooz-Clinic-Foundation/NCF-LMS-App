/*
# Fix Video File Paths

Update the video file paths in the database to match the actual files in Supabase storage.
Based on the mock data, the correct paths should match the existing video URLs.

## Changes
- Update video_file_path to match actual storage structure
- Ensure paths are consistent with Supabase storage naming
*/

-- Update video file paths to match actual storage structure
UPDATE module_videos 
SET video_file_path = CASE 
  WHEN id = '660e8400-e29b-41d4-a716-446655440001' THEN 'Module%201/Video1.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440002' THEN 'Module%201/Video12.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440003' THEN 'Module%201/Video24.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440004' THEN 'Module%201/Video28.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440005' THEN 'Module%207/Video29.mp4'
  ELSE video_file_path
END
WHERE id IN (
  '660e8400-e29b-41d4-a716-446655440001',
  '660e8400-e29b-41d4-a716-446655440002', 
  '660e8400-e29b-41d4-a716-446655440003',
  '660e8400-e29b-41d4-a716-446655440004',
  '660e8400-e29b-41d4-a716-446655440005'
);