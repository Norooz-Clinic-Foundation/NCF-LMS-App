import { View, Text, StyleSheet, ScrollView } from "react-native"
import { MainLayout } from "../../components/layout/MainLayout"
import { GlobalTextStyles } from "../../components/ui/GlobalStyles"

export default function ReferenceScreen() {
  return (
    <MainLayout activeTab="reference">
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={[GlobalTextStyles.h2, styles.title]}>Reference Materials</Text>
        <Text style={[GlobalTextStyles.body, styles.description]}>
          Access important documents, policies, and frequently asked questions.
        </Text>

        <View style={styles.section}>
          <Text style={[GlobalTextStyles.h4, styles.sectionTitle]}>Quick Reference</Text>
          <View style={styles.card}>
            <Text style={[GlobalTextStyles.bodySmall, styles.cardText]}>• Clinic policies and procedures</Text>
            <Text style={[GlobalTextStyles.bodySmall, styles.cardText]}>• Emergency contact information</Text>
            <Text style={[GlobalTextStyles.bodySmall, styles.cardText]}>• Frequently asked questions</Text>
            <Text style={[GlobalTextStyles.bodySmall, styles.cardText]}>• Training materials</Text>
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf8",
  },
  content: {
    padding: 24,
  },
  title: {
    color: "#2b2b2b",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    color: "#4a4a4a",
    textAlign: "center",
    marginBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#2b2b2b",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    color: "#4a4a4a",
    marginBottom: 8,
  },
})
