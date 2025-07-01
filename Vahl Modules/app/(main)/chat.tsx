import { View, Text, StyleSheet, ScrollView } from "react-native"
import { MainLayout } from "../../components/layout/MainLayout"
import { GlobalTextStyles } from "../../components/ui/GlobalStyles"

export default function ChatScreen() {
  return (
    <MainLayout activeTab="chat">
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={[GlobalTextStyles.h2, styles.title]}>Chat & Support</Text>
        <Text style={[GlobalTextStyles.body, styles.description]}>
          Connect with your team and get support when you need it.
        </Text>

        <View style={styles.section}>
          <Text style={[GlobalTextStyles.h4, styles.sectionTitle]}>Available Channels</Text>
          <View style={styles.card}>
            <Text style={[GlobalTextStyles.bodySmall, styles.cardText]}>• General support chat</Text>
            <Text style={[GlobalTextStyles.bodySmall, styles.cardText]}>• Technical assistance</Text>
            <Text style={[GlobalTextStyles.bodySmall, styles.cardText]}>• Training questions</Text>
            <Text style={[GlobalTextStyles.bodySmall, styles.cardText]}>• Emergency support</Text>
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
