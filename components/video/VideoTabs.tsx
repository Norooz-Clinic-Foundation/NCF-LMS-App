import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from "react-native"
import { GlobalTextStyles } from "../ui/GlobalStyles"

interface VideoTabsProps {
  activeTab: "transcript" | "documents"
  onTabChange: (tab: "transcript" | "documents") => void
  transcriptContent?: string
  documentsContent?: string
}

export const VideoTabs: React.FC<VideoTabsProps> = ({
  activeTab,
  onTabChange,
  transcriptContent,
  documentsContent,
}) => {
  const defaultTranscript = `Transcript will be available soon. This video covers important training content for your onboarding process.`

  const defaultDocuments = `Related documents and resources for this video will be available soon.

Please check back later for additional materials and resources.`

  return (
    <View style={styles.container}>
      {/* Tab Headers */}
      <View style={styles.tabHeaders}>
        <TouchableOpacity
          style={[styles.tabHeader, activeTab === "transcript" && styles.activeTabHeader]}
          onPress={() => onTabChange("transcript")}
        >
          <Text style={[styles.tabHeaderText, activeTab === "transcript" && styles.activeTabHeaderText]}>
            TRANSCRIPT
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabHeader, activeTab === "documents" && styles.activeTabHeader]}
          onPress={() => onTabChange("documents")}
        >
          <Text style={[styles.tabHeaderText, activeTab === "documents" && styles.activeTabHeaderText]}>DOCUMENTS</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <ScrollView
        style={styles.tabContent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.tabContentContainer}
      >
        <Text style={[GlobalTextStyles.body, styles.contentText]}>
          {activeTab === "transcript" ? transcriptContent || defaultTranscript : documentsContent || defaultDocuments}
        </Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  tabHeaders: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginBottom: 24,
  },
  tabHeader: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTabHeader: {
    borderBottomColor: "#001e70",
  },
  tabHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "Nunito-SemiBold" : "Nunito-SemiBold",
    color: "#9ca3af",
    letterSpacing: 0.5,
  },
  activeTabHeaderText: {
    color: "#001e70",
  },
  tabContent: {
    flex: 1,
  },
  tabContentContainer: {
    paddingBottom: 40,
  },
  contentText: {
    color: "#4a4a4a",
    lineHeight: 24,
  },
})
