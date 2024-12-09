// done

import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import SignUpHeader from '../components/SignUp/SignUpHeader';
import SignUpBody from '../components/SignUp/SignUpBody';
import { moderateScale } from 'react-native-size-matters';

const SignUp = () => {

  return (
    <View style={styles.container}>

      <SignUpHeader />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SignUpBody />
      </ScrollView>

    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: moderateScale(20),
  },
});
