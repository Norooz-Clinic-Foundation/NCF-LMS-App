import type { OnboardingModule } from '../types/module';

export const mockModules: OnboardingModule[] = [
  {
    id: 'module-1',
    title: 'Temporary Module Name',
    description: 'Temporary Module Description',
    duration: '45 mins',
    progress: 0,
    isCompleted: false,
    isLocked: false,
    moduleNumber: 1,
    category: 'orientation',
    thumbnailUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
    tags: ['temp tag', 'temp tag', 'temp tag'],
    videoCount: 4,
    videos: [
      {
        id: 'video-1-1',
        title: 'Temporary Title',
        duration: '~6 mins',
        isCompleted: false,
        videoUrl: 'https://repvjlxuilebdahpnnua.supabase.co/storage/v1/object/public/videos/Module%201/Video1.mp4',
        order: 1,
        description: 'Temporary Description',
        transcript: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        documents: 'Welcome packet, Clinic handbook, Mission statement, Intern orientation checklist'
      },
      {
        id: 'video-1-2',
        title: 'Temporary Title',
        duration: '~4 min',
        isCompleted: false,
        videoUrl: 'https://repvjlxuilebdahpnnua.supabase.co/storage/v1/object/public/videos/Module%201/Video12.mp4',
        order: 2,
        description: 'Temporary Description',
        transcript: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        documents: 'Clinic timeline, Annual reports, Community impact studies, Founding principles document'
      },
      {
        id: 'video-1-3',
        title: 'Temporary Title',
        duration: '~4 mins',
        isCompleted: false,
        videoUrl: 'https://repvjlxuilebdahpnnua.supabase.co/storage/v1/object/public/videos/Module%201/Video24.mp4',
        order: 3,
        description: 'Temporary Description',
        transcript: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        documents: 'Intern handbook, Role descriptions, Support resources, Supervision schedule'
      },
      {
        id: 'video-1-4',
        title: 'Temporary Title',
        duration: '~3 mins',
        isCompleted: false,
        videoUrl: 'https://repvjlxuilebdahpnnua.supabase.co/storage/v1/object/public/videos/Module%201/Video28.mp4',
        order: 4,
        description: 'Temporary Description',
        transcript: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        documents: 'Team directory, Contact information, Organizational chart, Team member bios'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'module-2',
    title: 'Client Communication Fundamentals',
    description: 'Essential skills for effective communication with clients, including active listening, empathy, and professional boundaries.',
    duration: '60 mins',
    progress: 0,
    isCompleted: false,
    isLocked: false,
    moduleNumber: 2,
    category: 'training',
    thumbnailUrl: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
    tags: ['communication', 'client-care', 'professional-skills'],
    videoCount: 3,
    videos: [
      {
        id: 'video-2-1',
        title: 'Active Listening Techniques',
        duration: '18 mins',
        isCompleted: false,
        videoUrl: 'https://repvjlxuilebdahpnnua.supabase.co/storage/v1/object/public/videos/Module%207/Video29.mp4',
        order: 1,
        description: 'Master the art of active listening to build rapport and understanding with clients.',
        transcript: 'Active listening is more than just hearing words. It involves fully concentrating, understanding, responding, and remembering what the client is saying. Key techniques include maintaining eye contact, using verbal and non-verbal encouragers, paraphrasing what you\'ve heard, asking clarifying questions, and avoiding interruptions. Practice reflecting emotions and summarizing key points to show understanding. Remember, active listening creates a safe space for clients to share their experiences and feelings.',
        documents: 'Active listening checklist, Practice exercises, Assessment rubric, Communication guidelines'
      },
      {
        id: 'video-2-2',
        title: 'Empathy and Emotional Intelligence',
        duration: '22 mins',
        isCompleted: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        order: 2,
        description: 'Develop your emotional intelligence and learn to respond with appropriate empathy.',
        transcript: 'Empathy is the ability to understand and share the feelings of another. In therapeutic settings, empathy helps build trust and rapport with clients. Emotional intelligence involves recognizing your own emotions and those of others, managing emotional responses appropriately, and using emotional information to guide thinking and behavior. Practice perspective-taking, validate client emotions, and respond with genuine care while maintaining professional boundaries.',
        documents: 'Empathy scale, Self-assessment tools, Case studies, Emotional intelligence resources'
      },
      {
        id: 'video-2-3',
        title: 'Professional Boundaries',
        duration: '20 mins',
        isCompleted: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        order: 3,
        description: 'Understanding and maintaining appropriate professional boundaries with clients.',
        transcript: 'Professional boundaries are essential for maintaining therapeutic relationships. They protect both the client and the therapist, ensuring that the relationship remains focused on the client\'s therapeutic needs. Boundaries include maintaining confidentiality, avoiding dual relationships, setting clear expectations about contact outside of sessions, and being mindful of self-disclosure. When boundaries are unclear or violated, it can harm the therapeutic process and potentially cause harm to the client.',
        documents: 'Boundary guidelines, Ethical standards, Scenario examples, Professional conduct policies'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'module-3',
    title: 'Documentation and Record Keeping',
    description: 'Learn proper documentation procedures, HIPAA compliance, and electronic health record management.',
    duration: '40 mins',
    progress: 0,
    isCompleted: false,
    isLocked: false,
    moduleNumber: 3,
    category: 'training',
    thumbnailUrl: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
    tags: ['documentation', 'hipaa', 'records', 'compliance'],
    videoCount: 2,
    videos: [
      {
        id: 'video-3-1',
        title: 'HIPAA Compliance Basics',
        duration: '15 mins',
        isCompleted: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        order: 1,
        description: 'Essential HIPAA requirements for protecting patient privacy and confidentiality.',
        transcript: 'HIPAA, the Health Insurance Portability and Accountability Act, sets the standard for protecting sensitive patient data. Key requirements include obtaining patient consent before sharing information, implementing physical and electronic safeguards, training staff on privacy practices, and reporting any breaches. Protected Health Information (PHI) includes any information that could identify a patient, including names, addresses, dates, and medical records. Always follow the minimum necessary rule when accessing or sharing PHI.',
        documents: 'HIPAA guidelines, Privacy policies, Compliance checklist, Breach reporting procedures'
      },
      {
        id: 'video-3-2',
        title: 'Electronic Health Records',
        duration: '25 mins',
        isCompleted: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        order: 2,
        description: 'Navigate our EHR system and learn proper documentation procedures.',
        transcript: 'Our electronic health record system is the backbone of our documentation process. In this video, you\'ll learn how to navigate the system, create new client records, document session notes, track treatment plans, and generate reports. Proper documentation is crucial for continuity of care, legal protection, and insurance billing. Always document sessions promptly, use objective language, include relevant observations, and ensure all entries are dated and signed electronically.',
        documents: 'EHR user guide, Documentation templates, Best practices, System troubleshooting'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'module-4',
    title: 'Crisis Intervention and Safety',
    description: 'Learn to recognize, assess, and respond to mental health crises and safety concerns.',
    duration: '55 mins',
    progress: 0,
    isCompleted: false,
    isLocked: true,
    moduleNumber: 4,
    category: 'training',
    thumbnailUrl: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
    tags: ['crisis', 'safety', 'emergency', 'intervention'],
    videoCount: 3,
    videos: [
      {
        id: 'video-4-1',
        title: 'Recognizing Crisis Situations',
        duration: '20 mins',
        isCompleted: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
        order: 1,
        description: 'Learn to identify signs of mental health crises and assess risk levels.',
        transcript: 'Crisis situations in mental health can range from acute anxiety attacks to suicidal ideation. Key warning signs include sudden changes in behavior, expressions of hopelessness, social withdrawal, substance abuse, and direct or indirect threats of self-harm. Learn to assess immediate risk factors, protective factors, and the client\'s current mental state. Always take any mention of self-harm or suicide seriously and follow established protocols.',
        documents: 'Crisis assessment tools, Risk factors checklist, Warning signs guide, Emergency protocols'
      },
      {
        id: 'video-4-2',
        title: 'De-escalation Techniques',
        duration: '18 mins',
        isCompleted: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
        order: 2,
        description: 'Master verbal and non-verbal techniques to calm distressed clients.',
        transcript: 'De-escalation involves using verbal and non-verbal techniques to reduce tension and help clients regain emotional control. Key strategies include speaking in a calm, low voice, maintaining non-threatening body language, validating the client\'s feelings, offering choices when possible, and avoiding arguments or confrontation. Create a safe environment, remove potential triggers, and focus on the client\'s immediate needs and concerns.',
        documents: 'De-escalation strategies, Communication techniques, Safety protocols, Practice scenarios'
      },
      {
        id: 'video-4-3',
        title: 'Emergency Procedures and Resources',
        duration: '17 mins',
        isCompleted: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        order: 3,
        description: 'Know when and how to access emergency services and crisis resources.',
        transcript: 'When a client is in immediate danger, quick action is essential. Know your clinic\'s emergency procedures, including when to call 911, how to contact crisis hotlines, and when to involve family members or emergency contacts. Familiarize yourself with local crisis resources, including mobile crisis teams, emergency psychiatric services, and inpatient facilities. Always document crisis interventions thoroughly and follow up with appropriate supervision.',
        documents: 'Emergency contact list, Crisis resources directory, Procedure flowcharts, Documentation forms'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'module-5',
    title: 'Cultural Competency and Diversity',
    description: 'Develop cultural awareness and skills to work effectively with diverse client populations.',
    duration: '50 mins',
    progress: 0,
    isCompleted: false,
    isLocked: true,
    moduleNumber: 5,
    category: 'training',
    thumbnailUrl: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
    tags: ['culture', 'diversity', 'inclusion', 'competency'],
    videoCount: 3,
    videos: [
      {
        id: 'video-5-1',
        title: 'Understanding Cultural Differences',
        duration: '18 mins',
        isCompleted: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        order: 1,
        description: 'Explore how culture influences mental health beliefs and treatment approaches.',
        transcript: 'Culture significantly impacts how individuals understand and express mental health concerns. Different cultures may have varying beliefs about the causes of mental illness, appropriate treatment methods, and the role of family in healing. Some cultures may emphasize collective rather than individual approaches to problem-solving. Understanding these differences helps you provide more effective, culturally-sensitive care.',
        documents: 'Cultural assessment tools, Diversity resources, Cultural competency guidelines, Community resources'
      },
      {
        id: 'video-5-2',
        title: 'Working with Interpreters',
        duration: '15 mins',
        isCompleted: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        order: 2,
        description: 'Best practices for conducting therapy sessions with language interpreters.',
        transcript: 'When working with clients who speak different languages, professional interpreters are essential for effective communication. Best practices include speaking directly to the client, using first person, pausing frequently for interpretation, avoiding jargon or idioms, and briefing the interpreter beforehand about the session\'s purpose. Remember that interpreters should remain neutral and translate everything accurately.',
        documents: 'Interpreter guidelines, Language resources, Communication protocols, Cultural liaison contacts'
      },
      {
        id: 'video-5-3',
        title: 'Addressing Bias and Microaggressions',
        duration: '17 mins',
        isCompleted: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        order: 3,
        description: 'Recognize and address unconscious bias and microaggressions in therapeutic settings.',
        transcript: 'Unconscious bias and microaggressions can significantly impact the therapeutic relationship and treatment outcomes. Microaggressions are subtle, often unintentional discriminatory comments or actions. Learn to recognize your own biases, understand their impact on clients, and develop strategies to address them. When microaggressions occur, acknowledge them, apologize sincerely, and commit to doing better.',
        documents: 'Bias awareness exercises, Microaggression examples, Self-reflection tools, Inclusive practice guidelines'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Helper function to get a module by ID
export const getModuleById = (moduleId: string): OnboardingModule | undefined => {
  return mockModules.find(module => module.id === moduleId);
};

// Helper function to get a video by module and video ID
export const getVideoById = (moduleId: string, videoId: string) => {
  const module = getModuleById(moduleId);
  if (!module || !module.videos) return { video: null, module: null };
  
  const video = module.videos.find(v => v.id === videoId);
  return { video: video || null, module };
};

// Helper function to get all videos for a module
export const getModuleVideos = (moduleId: string) => {
  const module = getModuleById(moduleId);
  return module?.videos || [];
};

// Helper function to simulate progress updates
export const updateVideoProgress = (moduleId: string, videoId: string, progress: number) => {
  const moduleIndex = mockModules.findIndex(m => m.id === moduleId);
  if (moduleIndex === -1) return false;
  
  const videoIndex = mockModules[moduleIndex].videos?.findIndex(v => v.id === videoId);
  if (videoIndex === -1 || videoIndex === undefined) return false;
  
  if (mockModules[moduleIndex].videos) {
    mockModules[moduleIndex].videos[videoIndex].isCompleted = progress >= 95;
    
    // Update module progress
    const completedVideos = mockModules[moduleIndex].videos!.filter(v => v.isCompleted).length;
    const totalVideos = mockModules[moduleIndex].videos!.length;
    mockModules[moduleIndex].progress = Math.round((completedVideos / totalVideos) * 100);
    mockModules[moduleIndex].isCompleted = mockModules[moduleIndex].progress === 100;
  }
  
  return true;
};