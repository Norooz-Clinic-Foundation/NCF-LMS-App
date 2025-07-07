/*
# Update Storage Bucket to Public

This migration updates the videos storage bucket to be public for direct access.

## Changes
- Set videos bucket to public
- Update storage policies for public access
*/

-- Update videos storage bucket to be public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'videos';

-- Remove old private policies
DROP POLICY IF EXISTS "Authenticated users can read videos" ON storage.objects;
DROP POLICY IF EXISTS "Service role can manage videos" ON storage.objects;

-- Add new public policies
CREATE POLICY "Public can read videos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'videos');

CREATE POLICY "Service role can manage videos"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'videos');