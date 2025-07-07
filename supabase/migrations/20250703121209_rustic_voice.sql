/*
# Populate Database with Video Content

This migration populates the existing database schema with modules and videos
that match your Supabase storage structure.

## Changes
- Clear existing data from onboarding_modules and module_videos
- Insert modules matching your storage folders
- Insert videos with correct file paths
- Update existing modules with proper data
*/

-- Clear existing data safely (only if tables exist)
DO $$ 
BEGIN
    -- Clear video progress first (foreign key dependency)
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'video_progress') THEN
        DELETE FROM video_progress;
    END IF;
    
    -- Clear module videos (foreign key dependency)
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'module_videos') THEN
        DELETE FROM module_videos;
    END IF;
    
    -- Clear modules
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'onboarding_modules') THEN
        DELETE FROM onboarding_modules;
    END IF;
END $$;

-- Insert modules based on your storage structure
INSERT INTO onboarding_modules (id, title, description, duration, module_number, category, tags, is_published, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Welcome to Norooz Clinic', 'Introduction to our clinic, mission, and values. Learn about our approach to mental health care and your role as an intern.', '45 mins', 1, 'orientation', ARRAY['welcome', 'introduction', 'clinic-overview'], true, now(), now()),
('550e8400-e29b-41d4-a716-446655440002', 'Client Communication Fundamentals', 'Essential skills for effective communication with clients, including active listening, empathy, and professional boundaries.', '60 mins', 2, 'training', ARRAY['communication', 'client-care', 'professional-skills'], true, now(), now()),
('550e8400-e29b-41d4-a716-446655440003', 'Documentation and Record Keeping', 'Learn proper documentation procedures, HIPAA compliance, and electronic health record management.', '40 mins', 3, 'training', ARRAY['documentation', 'hipaa', 'records', 'compliance'], true, now(), now()),
('550e8400-e29b-41d4-a716-446655440004', 'Crisis Intervention and Safety', 'Learn to recognize, assess, and respond to mental health crises and safety concerns.', '55 mins', 4, 'training', ARRAY['crisis', 'safety', 'emergency', 'intervention'], true, now(), now()),
('550e8400-e29b-41d4-a716-446655440005', 'Cultural Competency and Diversity', 'Develop cultural awareness and skills to work effectively with diverse client populations.', '50 mins', 5, 'training', ARRAY['culture', 'diversity', 'inclusion', 'competency'], true, now(), now()),
('550e8400-e29b-41d4-a716-446655440006', 'Professional Development', 'Focus on professional growth, ethics, and career development in mental health.', '45 mins', 6, 'training', ARRAY['professional', 'growth', 'ethics', 'development'], true, now(), now()),
('550e8400-e29b-41d4-a716-446655440007', 'Advanced Clinical Skills', 'Advanced therapeutic techniques and clinical interventions for experienced interns.', '65 mins', 7, 'training', ARRAY['advanced', 'clinical', 'therapeutic', 'techniques'], true, now(), now()),
('550e8400-e29b-41d4-a716-446655440008', 'Ethics and Legal Considerations', 'Understanding ethical guidelines and legal requirements in mental health practice.', '50 mins', 8, 'training', ARRAY['ethics', 'legal', 'compliance', 'guidelines'], true, now(), now());

-- Insert videos for Module 1 (based on your storage structure)
INSERT INTO module_videos (id, module_id, title, description, duration, video_file_path, order_number, transcript, documents, is_published, created_at, updated_at) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Introduction to Norooz Clinic', 'Welcome to Norooz Clinic Foundation. Learn about our mission and your role as an intern.', '~6 mins', 'Module1/Video1.mp4', 1, 'Welcome to Norooz Clinic Foundation. We are excited to have you join our team as an intern. This video will introduce you to our clinic, our mission, and what you can expect during your internship journey with us.', 'Welcome packet, Clinic handbook, Mission statement, Intern orientation checklist', true, now(), now()),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Clinic Mission and Values', 'Understanding our core mission and the values that guide our work.', '~4 mins', 'Module1/Video12.mp4', 2, 'Our mission at Norooz Clinic is to provide accessible, culturally competent mental health services to our community. We believe in treating every client with dignity, respect, and compassion.', 'Clinic timeline, Annual reports, Community impact studies, Founding principles document', true, now(), now()),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Your Role as an Intern', 'Learn about your responsibilities and expectations as an intern.', '~4 mins', 'Module1/Video24.mp4', 3, 'As an intern at Norooz Clinic, you will play a vital role in supporting our clients and learning essential clinical skills. This video outlines your responsibilities and expectations.', 'Intern handbook, Role descriptions, Support resources, Supervision schedule', true, now(), now()),
('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'Team Structure and Support', 'Understanding our team structure and how to access support.', '~3 mins', 'Module1/Video28.mp4', 4, 'Understanding our team structure is crucial for your success. Learn about the different roles, supervision structure, and how to access support when you need it.', 'Team directory, Contact information, Organizational chart, Team member bios', true, now(), now()),
('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001', 'Getting Started Guide', 'A comprehensive guide to help you navigate your first days.', '~5 mins', 'Module1/Video30.mp4', 5, 'This comprehensive guide will help you navigate your first days at the clinic, including important procedures, systems, and resources available to you.', 'Getting started checklist, System access guides, Important procedures', true, now(), now()),
('660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440001', 'Resources and Tools', 'Familiarize yourself with the tools and resources available to you.', '~6 mins', 'Module1/Video42.mp4', 6, 'Familiarize yourself with the various tools, resources, and systems you will use during your internship. This includes our electronic health record system, communication tools, and reference materials.', 'Resource directory, Tool guides, System manuals, Reference materials', true, now(), now());

-- Insert videos for Module 2
INSERT INTO module_videos (id, module_id, title, description, duration, video_file_path, order_number, transcript, documents, is_published, created_at, updated_at) VALUES
('660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440002', 'Active Listening Techniques', 'Master the art of active listening to build rapport with clients.', '~8 mins', 'Module2/Video12.mp4', 1, 'Active listening is a fundamental skill in therapeutic communication. Learn techniques for fully engaging with clients, demonstrating empathy, and building therapeutic rapport.', 'Active listening checklist, Practice exercises, Assessment rubric, Communication guidelines', true, now(), now());

-- Insert videos for Module 3
INSERT INTO module_videos (id, module_id, title, description, duration, video_file_path, order_number, transcript, documents, is_published, created_at, updated_at) VALUES
('660e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440003', 'Documentation Best Practices', 'Learn proper documentation procedures and best practices.', '~7 mins', 'Module3/Video24.mp4', 1, 'Proper documentation is essential for client care and legal compliance. Learn best practices for writing clear, accurate, and professional clinical notes.', 'Documentation templates, Best practices guide, Sample notes, Quality standards', true, now(), now()),
('660e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440003', 'HIPAA Compliance', 'Understanding HIPAA regulations and privacy requirements.', '~6 mins', 'Module3/Video28.mp4', 2, 'Understanding HIPAA regulations is crucial for protecting client privacy and confidentiality. This video covers key requirements and practical applications.', 'HIPAA guidelines, Privacy policies, Compliance checklist, Breach reporting procedures', true, now(), now());

-- Insert videos for Module 4
INSERT INTO module_videos (id, module_id, title, description, duration, video_file_path, order_number, transcript, documents, is_published, created_at, updated_at) VALUES
('660e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440004', 'Crisis Recognition and Response', 'Learn to recognize and respond to mental health crises.', '~8 mins', 'Module4/Video28.mp4', 1, 'Learn to recognize signs of mental health crises and appropriate intervention strategies. This training covers assessment, de-escalation, and when to seek additional support.', 'Crisis assessment tools, Emergency protocols, Response procedures, Contact information', true, now(), now());

-- Insert videos for Module 5
INSERT INTO module_videos (id, module_id, title, description, duration, video_file_path, order_number, transcript, documents, is_published, created_at, updated_at) VALUES
('660e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440005', 'Cultural Sensitivity Training', 'Develop cultural competency for diverse client populations.', '~9 mins', 'Module5/Video30.mp4', 1, 'Developing cultural competency is essential for effective therapeutic work. Learn about cultural considerations, bias awareness, and inclusive practice approaches.', 'Cultural assessment tools, Diversity resources, Competency guidelines, Community resources', true, now(), now());

-- Insert videos for Module 6
INSERT INTO module_videos (id, module_id, title, description, duration, video_file_path, order_number, transcript, documents, is_published, created_at, updated_at) VALUES
('660e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440006', 'Professional Growth and Development', 'Focus on your professional development and career planning.', '~7 mins', 'Module6/Video42.mp4', 1, 'Your professional growth is important to us. This video covers goal setting, skill development, and career planning in the mental health field.', 'Development plans, Goal setting worksheets, Career resources, Professional guidelines', true, now(), now());

-- Insert videos for Module 7
INSERT INTO module_videos (id, module_id, title, description, duration, video_file_path, order_number, transcript, documents, is_published, created_at, updated_at) VALUES
('660e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440007', 'Advanced Therapeutic Techniques', 'Learn advanced clinical skills and therapeutic interventions.', '~10 mins', 'Module7/Video29.mp4', 1, 'Build upon your foundational skills with advanced therapeutic techniques and interventions. This training is designed for interns who have completed the basic modules.', 'Advanced technique guides, Clinical protocols, Intervention strategies, Assessment tools', true, now(), now());