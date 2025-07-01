import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Check } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  checked: boolean;
}

const { width, height } = Dimensions.get('window');
const isSmallDevice = height < 700;
const isMediumDevice = height >= 700 && height < 850;

export default function PreOrientationChecklistScreen() {
  const insets = useSafeAreaInsets();
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    {
      id: "gmail",
      title: "Create Norooz Gmail account",
      description: "You should have logged into the app with your Gmail account.",
      checked: false
    },
    {
      id: "voice",
      title: "Create Norooz Google Voice number",
      description: "This will help you connect with your clients and admin.",
      checked: false
    },
    {
      id: "calendar",
      title: "Access your Google Calendar",
      description: "This will help you schedule your clients.",
      checked: false
    },
    {
      id: "orientation",
      title: "Attend in-person orientation",
      description: "Meet the team and learn our procedures.",
      checked: false
    }
  ]);

  const handleCheckboxChange = (id: string) => {
    setChecklistItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleContinue = () => {
    console.log('Continuing from pre-orientation checklist');
    router.push("/onboarding/onboarding")
  };

  const handleBack = () => {
    router.back();
  };

  const allItemsChecked = checklistItems.every(item => item.checked);
  const checkedCount = checklistItems.filter(item => item.checked).length;
  const totalItems = checklistItems.length;
  
  const baseProgress = 75;
  const remainingProgress = 25;
  const checklistProgress = (checkedCount / totalItems) * remainingProgress;
  const totalProgress = baseProgress + checklistProgress;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 12) }]}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#2b2b2b" />
        </TouchableOpacity>
      </View>

      <View style={[styles.content, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${totalProgress}%` }]} />
            {allItemsChecked && <View style={styles.progressDot} />}
          </View>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContent}>
            <Text style={[
              styles.heading,
              {
                marginBottom: isSmallDevice ? 20 : isMediumDevice ? 24 : 32,
                fontSize: isSmallDevice ? 22 : 24,
              }
            ]}>
              Before you get started
            </Text>

            <Text style={[
              styles.description,
              {
                marginBottom: isSmallDevice ? 24 : isMediumDevice ? 28 : 32,
                fontSize: isSmallDevice ? 13 : 14,
                lineHeight: isSmallDevice ? 18 : 20,
              }
            ]}>
              Please make sure you have completed the following. If you are missing anything, please contact admin.
            </Text>

            <View style={styles.checklistContainer}>
              {checklistItems.map((item) => (
                <View key={item.id} style={[
                  styles.checklistItem,
                  {
                    marginBottom: isSmallDevice ? 20 : 24,
                    gap: isSmallDevice ? 12 : 16,
                  }
                ]}>
                  <TouchableOpacity
                    onPress={() => handleCheckboxChange(item.id)}
                    style={[
                      styles.checkbox,
                      item.checked && styles.checkboxChecked,
                      {
                        width: isSmallDevice ? 20 : 24,
                        height: isSmallDevice ? 20 : 24,
                        marginTop: isSmallDevice ? 2 : 4,
                      }
                    ]}
                  >
                    {item.checked && <Check size={isSmallDevice ? 12 : 16} color="white" />}
                  </TouchableOpacity>

                  <View style={styles.itemContent}>
                    <Text style={[
                      styles.itemTitle,
                      {
                        fontSize: isSmallDevice ? 15 : 16,
                        lineHeight: isSmallDevice ? 20 : 22,
                        marginBottom: isSmallDevice ? 6 : 8,
                      }
                    ]}>
                      {item.title}
                    </Text>
                    <Text style={[
                      styles.itemDescription,
                      {
                        fontSize: isSmallDevice ? 11 : 12,
                        lineHeight: isSmallDevice ? 14 : 16,
                      }
                    ]}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={[
          styles.buttonContainer,
          {
            paddingTop: isSmallDevice ? 16 : 20,
            paddingBottom: isSmallDevice ? 8 : 12,
          }
        ]}>
          <TouchableOpacity
            onPress={handleContinue}
            disabled={!allItemsChecked}
            style={[
              styles.continueButton,
              !allItemsChecked && styles.disabledButton
            ]}
          >
            <Text style={styles.buttonText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomIndicator}>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbf8',
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 8,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  progressContainer: {
    width: '100%',
    marginBottom: isSmallDevice ? 16 : 20,
    marginTop: isSmallDevice ? 8 : 12,
    position: 'relative',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(0, 30, 112, 0.1)',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#001e70',
    borderRadius: 4,
  },
  progressDot: {
    position: 'absolute',
    top: 0,
    right: -4,
    width: 8,
    height: 8,
    backgroundColor: '#ff69b4',
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  mainContent: {
    alignItems: 'center',
    paddingVertical: isSmallDevice ? 20 : isMediumDevice ? 30 : 40,
  },
  heading: {
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Nunito-ExtraBold' : 'Nunito-ExtraBold',
    color: '#2b2b2b',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  description: {
    fontFamily: Platform.OS === 'ios' ? 'Nunito-Regular' : 'Nunito-Regular',
    color: '#4a4a4a',
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  checklistContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    borderWidth: 2,
    borderColor: '#e5e5e5',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#001e70',
    borderColor: '#001e70',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Nunito-SemiBold' : 'Nunito-SemiBold',
    color: '#2b2b2b',
  },
  itemDescription: {
    fontFamily: Platform.OS === 'ios' ? 'Nunito-Regular' : 'Nunito-Regular',
    color: '#4a4a4a',
  },
  buttonContainer: {
    width: '100%',
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#001e70',
    paddingVertical: Platform.OS === 'ios' ? 18 : 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#001e70',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Nunito-Bold' : 'Nunito-Bold',
    letterSpacing: 0.5,
  },
  bottomIndicator: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  pinkDot: {
    width: 32,
    height: 4,
    backgroundColor: '#ff69b4',
    borderRadius: 2,
  },
});