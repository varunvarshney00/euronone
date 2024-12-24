import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import Navigation from './src/navigation/Navigation';
import './gesture-handler';
import 'react-native-gesture-handler';
import store from '../euronone/src/redux/store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Navigation />
      </View>
    </Provider>

  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
