/**
 * Icebreaker AI — Root App
 * AI-powered team warmup games for corporate meetings and remote teams.
 * Built on alphinium-app platform.
 */
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { colors } from './src/theme';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
});
