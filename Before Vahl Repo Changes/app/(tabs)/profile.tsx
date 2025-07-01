import { View, Text, StyleSheet } from 'react-native';
import { GlobalTextStyles } from '@/components/ui/GlobalStyles';

export default function ProfileTab() {
  return (
    <View style={styles.container}>
      <Text style={[GlobalTextStyles.h3, styles.title]}>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
  title: {
    color: '#1C1C1E',
  },
});