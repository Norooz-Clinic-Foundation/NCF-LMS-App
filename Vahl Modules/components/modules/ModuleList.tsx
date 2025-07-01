import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
} from 'react-native';
import { ModuleCard } from './ModuleCard';
import { GlobalTextStyles } from '../ui/GlobalStyles';
import type { OnboardingModule } from '../../types/module';

interface ModuleListProps {
  modules: OnboardingModule[];
  onModulePress: (module: OnboardingModule) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  loading?: boolean;
  error?: string | null;
}

export const ModuleList: React.FC<ModuleListProps> = ({
  modules,
  onModulePress,
  onRefresh,
  refreshing = false,
  loading = false,
  error,
}) => {
  const renderModule = ({ item }: { item: OnboardingModule }) => (
    <ModuleCard
      module={item}
      onPress={onModulePress}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={[GlobalTextStyles.h4, styles.emptyTitle]}>
        No Modules Available
      </Text>
      <Text style={[GlobalTextStyles.body, styles.emptyDescription]}>
        Check back later for new onboarding modules.
      </Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.errorState}>
      <Text style={[GlobalTextStyles.h4, styles.errorTitle]}>
        Unable to Load Modules
      </Text>
      <Text style={[GlobalTextStyles.body, styles.errorDescription]}>
        {error || 'Please check your connection and try again.'}
      </Text>
    </View>
  );

  if (error) {
    return renderErrorState();
  }

  return (
    <FlatList
      data={modules}
      renderItem={renderModule}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#001e70"
            colors={['#001e70']}
          />
        ) : undefined
      }
      ListEmptyComponent={!loading ? renderEmptyState : null}
      scrollEnabled={false} // Disable FlatList scrolling since parent ScrollView handles it
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    color: '#2b2b2b',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyDescription: {
    color: '#4a4a4a',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  errorState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  errorTitle: {
    color: '#dc2626',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorDescription: {
    color: '#4a4a4a',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});