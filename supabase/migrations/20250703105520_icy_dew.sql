/*
# Insert Sample Data

This creates sample modules and videos for testing.
*/

-- Insert sample onboarding modules
INSERT INTO onboarding_modules (id, title, description, duration, module_number, category, tags, is_published)
VALUES 
  (
    '550e8400-e29b-41d4-a716-446655440001',
    'Welcome to Norooz Clinic',
    'Introduction to our clinic, mission, and values. Learn about our approach to mental health care and your role as an intern.',
    '45 mins',
    1,
    'orientation',
    ARRAY['welcome', 'introduction', 'clinic-overview'],
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440002', 
    'Client Communication Fundamentals',
    'Essential skills for effective communication with clients, including active listening, empathy, and professional boundaries.',
    '60 mins',
    2,
    'training',
    ARRAY['communication', 'client-care', 'professional-skills'],
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440003',
    'Documentation and Record Keeping',
    'Learn proper documentation procedures, HIPAA compliance, and electronic health record management.',
    '40 mins', 
    3,
    'training',
    ARRAY['documentation', 'hipaa', 'records', 'compliance'],
    true
  )
ON CONFLICT (id) DO NOTHING;

-- Insert sample videos for Module 1 (using the actual video URLs from your mock data)
INSERT INTO module_videos (id, module_id, title, description, duration, video_file_path, order_number, transcript, documents, is_published)
VALUES
  (
    '660e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440001',
    'Temporary Title',
    'Temporary Description',
    '~6 mins',
    'Module 1/Video1.mp4',
    1,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Welcome packet, Clinic handbook, Mission statement, Intern orientation checklist',
    true
  ),
  (
    '660e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440001', 
    'Temporary Title',
    'Temporary Description',
    '~4 min',
    'Module 1/Video12.mp4',
    2,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Clinic timeline, Annual reports, Community impact studies, Founding principles document',
    true
  ),
  (
    '660e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440001',
    'Temporary Title',
    'Temporary Description',
    '~4 mins',
    'Module 1/Video24.mp4',
    3,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Intern handbook, Role descriptions, Support resources, Supervision schedule',
    true
  ),
  (
    '660e8400-e29b-41d4-a716-446655440004',
    '550e8400-e29b-41d4-a716-446655440001',
    'Temporary Title',
    'Temporary Description',
    '~3 mins',
    'Module 1/Video28.mp4',
    4,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Team directory, Contact information, Organizational chart, Team member bios',
    true
  )
ON CONFLICT (id) DO NOTHING;

-- Insert sample videos for Module 2
INSERT INTO module_videos (id, module_id, title, description, duration, video_file_path, order_number, transcript, documents, is_published)
VALUES
  (
    '660e8400-e29b-41d4-a716-446655440005',
    '550e8400-e29b-41d4-a716-446655440002',
    'Active Listening Techniques',
    'Master the art of active listening to build rapport and understanding with clients.',
    '18 mins',
    'Module 7/Video29.mp4',
    1,
    'Active listening is more than just hearing words. It involves fully concentrating, understanding, responding...',
    'Active listening checklist, Practice exercises, Assessment rubric, Communication guidelines',
    true
  ),
  (
    '660e8400-e29b-41d4-a716-446655440006',
    '550e8400-e29b-41d4-a716-446655440002',
    'Empathy and Emotional Intelligence',
    'Develop your emotional intelligence and learn to respond with appropriate empathy.',
    '22 mins',
    'Module 2/empathy-training.mp4',
    2,
    'Empathy is the ability to understand and share the feelings of another. In therapeutic settings...',
    'Empathy scale, Self-assessment tools, Case studies, Emotional intelligence resources',
    true
  )
ON CONFLICT (id) DO NOTHING;