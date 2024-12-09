// done

import { StyleSheet, View } from 'react-native';
import React from 'react';
import SignInHeader from '../components/SignIn/SignInHeader';
import SignInBody from '../components/SignIn/SignInBody';

const SignIn = () => {
    return (
        <View style={styles.container}>
            <SignInHeader />
            <SignInBody />
        </View>
    );
};

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
});
