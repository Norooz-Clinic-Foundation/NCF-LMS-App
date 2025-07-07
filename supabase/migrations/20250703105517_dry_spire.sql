/*
# Setup Video Storage

This sets up the storage bucket and policies for video files.

## Storage Buckets
- `videos` - Main bucket for video files

## Security
- Authenticated users can read videos
- Proper access policies
*/

-- Create videos storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('videos', 'videos', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for videos bucket
CREATE POLICY "Authenticated users can read videos"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'videos');

CREATE POLICY "Service role can manage videos"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'videos');