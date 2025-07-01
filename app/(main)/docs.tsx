import { View, Text, StyleSheet, ScrollView } from "react-native"
import { MainLayout } from "../../components/layout/MainLayout"
import { GlobalTextStyles } from "../../components/ui/GlobalStyles"

export default function DocsScreen() {
  return (
    <MainLayout activeTab="docs">
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={[GlobalTextStyles.h2, styles.title]}>Documentation</Text>
        <Text style={[GlobalTextStyles.body, styles.description]}>
          Access training materials, forms, and important documents.
        </Text>

        <View style={styles.section}>
          <Text style={[GlobalTextStyles.h4, styles.sectionTitle]}>Document Categories</Text>
          <View style={styles.card}>
            <Text style={[GlobalTextStyles.bodySmall, styles.cardText]}>• Training manuals</Text>
            <Text style={[GlobalTextStyles.bodySmall, styles.cardText]}>• Forms and templates</Text>
            <Text style={[GlobalTextStyles.bodySmall, styles.cardText]}>• Policy documents</Text>
            <Text style={[GlobalTextStyles.bodySmall, styles.cardText]}>• Certification materials</Text>
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
