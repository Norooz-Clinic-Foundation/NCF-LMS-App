import React from 'react';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, User, Mail, Phone, MapPin } from 'lucide-react-native';
import { GlobalTextStyles } from '../components/ui/GlobalStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getUserProfile, type UserProfile } from '../lib/user-utils';
import { supabase } from '../lib/supabase';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const profile = await getUserProfile(user.id);
          setUserProfile(profile);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#2b2b2b" />
        </TouchableOpacity>
        
        <Text style={[GlobalTextStyles.h4, styles.headerTitle]}>
          Profile
        </Text>
        
        <TouchableOpacity style={styles.profileIconButton}>
          <User size={0} color="#2b2b2b" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(insets.bottom, 20) }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture and Basic Info */}
        <View style={styles.profileSection}>
          <View style={styles.profilePicture}>
            {userProfile?.avatar_url ? (
              <Image
                source={{ uri: userProfile.avatar_url }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            ) : (
              <User size={60} color="#cccccc" />
            )}
          </View>
          
          <Text style={[GlobalTextStyles.h3, styles.userName]}>
            {loading ? 'Loading...' : userProfile?.full_name || 'User Name'}
          </Text>
          
          <Text style={[GlobalTextStyles.body, styles.userTitle]}>
            Marriage & Family Therapy Intern
          </Text>
        </View>

        {/* Contact Information */}
        <View style={styles.contactSection}>
          <View style={styles.contactItem}>
            <Mail size={20} color="#666666" />
            <Text style={[GlobalTextStyles.body, styles.contactText]}>
              {userProfile?.email || 'No email available'}
            </Text>
          </View>
          
          <View style={styles.contactItem}>
            <Phone size={20} color="#666666" />
            <Text style={[GlobalTextStyles.body, styles.contactText]}>
              +1 (234) 567 - 8901
            </Text>
          </View>
          
          <View style={styles.contactItem}>
            <MapPin size={20} color="#666666" />
            <Text style={[GlobalTextStyles.body, styles.contactText]}>
              123 Main St, Santa Ana, CA 123456
            </Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={[GlobalTextStyles.h2, styles.statNumber]}>12</Text>
            <Text style={[GlobalTextStyles.bodySmall, styles.statLabel]}>Active Clients</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={[GlobalTextStyles.h2, styles.statNumber]}>16</Text>
            <Text style={[GlobalTextStyles.bodySmall, styles.statLabel]}>Hours Logged this Week</Text>
          </View>
        </View>

        {/* Supervisor Section */}
        <View style={styles.supervisorSection}>
          <Text style={[GlobalTextStyles.h5, styles.sectionTitle]}>
            Supervisor:
          </Text>
          
          <View style={styles.supervisorCard}>
            <View style={styles.supervisorHeader}>
              <View style={styles.supervisorPicture}>
                <User size={30} color="#cccccc" />
              </View>
              
              <View style={styles.supervisorInfo}>
                <Text style={[GlobalTextStyles.h5, styles.supervisorName]}>
                  Dr. Ehsan Gharadjedaghi
                </Text>
                <Text style={[GlobalTextStyles.bodySmall, styles.supervisorTitle]}>
                  Founder / Clinical Director
                </Text>
              </View>
            </View>
            
            <View style={styles.supervisorContact}>
              <View style={styles.contactItem}>
                <Mail size={18} color="#666666" />
                <Text style={[GlobalTextStyles.bodySmall, styles.contactText]}>
                  drehsan@noroozclinic.com
                </Text>
              </View>
              
              <View style={styles.contactItem}>
                <Phone size={18} color="#666666" />
                <Text style={[GlobalTextStyles.bodySmall, styles.contactText]}>
                  +1 (234) 567 - 8901
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Office Hours Section */}
        <View style={styles.officeHoursSection}>
          <Text style={[GlobalTextStyles.h5, styles.sectionTitle]}>
            Office Hours:
          </Text>
          
          <View style={styles.hoursCard}>
            <Text style={[GlobalTextStyles.body, styles.hoursText]}>
              Tuesday: 12pm-2pm
            </Text>
            <Text style={[GlobalTextStyles.body, styles.hoursText]}>
              Thursday: 10am-11am
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbf8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 8,
    backgroundColor: '#fffbf8',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 30, 112, 0.1)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    color: '#2b2b2b',
    fontWeight: '600',
  },
  profileIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 3,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#e5e7eb',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  userName: {
    color: '#2b2b2b',
    marginBottom: 8,
    textAlign: 'center',
  },
  userTitle: {
    color: '#666666',
    textAlign: 'center',
  },
  contactSection: {
    marginBottom: 32,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  contactText: {
    color: '#4a4a4a',
    flex: 1,
  },
  statsSection: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 40,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    color: '#2b2b2b',
    marginBottom: 8,
    fontWeight: '800',
  },
  statLabel: {
    color: '#666666',
    textAlign: 'center',
    fontWeight: '500',
  },
  supervisorSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#2b2b2b',
    marginBottom: 16,
    fontWeight: '600',
  },
  supervisorCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  supervisorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  supervisorPicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  supervisorInfo: {
    flex: 1,
  },
  supervisorName: {
    color: '#2b2b2b',
    marginBottom: 4,
  },
  supervisorTitle: {
    color: '#666666',
  },
  supervisorContact: {
    gap: 12,
  },
  officeHoursSection: {
    marginBottom: 32,
  },
  hoursCard: {
    backgroundColor: '#e5e7eb',
    padding: 16,
    borderRadius: 12,
  },
  hoursText: {
    color: '#4a4a4a',
    marginBottom: 4,
  },
});
