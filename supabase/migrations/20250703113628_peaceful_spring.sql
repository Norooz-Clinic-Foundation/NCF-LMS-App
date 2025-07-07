/*
# Fix Video Storage Paths

Update the video file paths in the database to match the actual storage structure.
Based on the storage screenshots, the files are organized in Module folders with specific video names.

## Changes
- Update video_file_path to match actual storage structure
- Ensure paths correspond to existing files in storage
*/

-- Update video file paths to match actual storage structure
UPDATE module_videos 
SET video_file_path = CASE 
  WHEN id = '660e8400-e29b-41d4-a716-446655440001' THEN 'Module 1/Video1.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440002' THEN 'Module 1/Video12.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440003' THEN 'Module 1/Video24.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440004' THEN 'Module 1/Video28.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440010' THEN 'Module 1/Video30.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440011' THEN 'Module 1/Video42.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440005' THEN 'Module 7/Video29.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440012' THEN 'Module 2/Video30.mp4'
  WHEN id = '660e8400-e29b-41d4-a716-446655440013' THEN 'Module 3/Video42.mp4'
  ELSE video_file_path
END
WHERE id IN (
  '660e8400-e29b-41d4-a716-446655440001',
  '660e8400-e29b-41d4-a716-446655440002', 
  '660e8400-e29b-41d4-a716-446655440003',
  '660e8400-e29b-41d4-a716-446655440004',
  '660e8400-e29b-41d4-a716-446655440005',
  '660e8400-e29b-41d4-a716-446655440010',
  '660e8400-e29b-41d4-a716-446655440011',
  '660e8400-e29b-41d4-a716-446655440012',
  '660e8400-e29b-41d4-a716-446655440013'
);

-- Verify the storage bucket is set to private (not public)
UPDATE storage.buckets 
SET public = false 
WHERE id = 'videos';