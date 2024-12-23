import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import Navigation from './src/navigation/Navigation';
import './gesture-handler';
import 'react-native-gesture-handler';

const App = () => {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
