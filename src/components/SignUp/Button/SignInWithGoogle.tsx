// done

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { onGoogleButtonPress } from '../../../config/firebase';
import { Images } from '../../../assets';
import { resetAndNavigate } from '../../../utils/NavigationUtils';
import { moderateScale } from 'react-native-size-matters';
import { Alert } from 'react-native';

const SignInWithGoogle = () => {

    const showAlert = (title: string, message: string) => {
        Alert.alert(title, message);
    };

    const handleGoogleSignIn = async () => {
        try {
            const user = await onGoogleButtonPress();

            // validating the user object
            if (!user) {
                return showAlert('Sign-In Failed',
                    'User information could not be retrieved. Please try again.'
                );
            }

            resetAndNavigate('Home Screen');

        } catch (error) {
            handleSignInError(error);
        }
    };

    const handleSignInError = (error: any) => {
        const errorCode = error?.code || 'unknown';

        switch (errorCode) {
            case 'auth/network-request-failed':
                showAlert(
                    'Network Error',
                    'There seems to be a problem with your internet connection. Please try again later.'
                );
                break;

            case 'auth/popup-closed-by-user':
                showAlert(
                    'Sign-In Cancelled',
                    'The Google Sign-In process was interrupted. Please try again if you want to log in.'
                );
                break;

            default:
                console.error('Google Sign-In Error:', error?.message || error);
                showAlert(
                    'Unexpected Error',
                    'An error occurred during Google Sign-In. Please try again later.'
                );
        }
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity
                onPress={handleGoogleSignIn}
                style={styles.button}>

                <Image source={Images.google} style={styles.icon} />

                <Text style={styles.text}>Continue With Google</Text>

            </TouchableOpacity>

        </View>
    );
};

export default SignInWithGoogle;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        height: moderateScale(55),
        borderRadius: moderateScale(8),
        width: moderateScale(300),
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: moderateScale(2),
        borderColor: 'lightgray',
        borderRadius: moderateScale(8),
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(15),
    },
    icon: {
        height: moderateScale(20),
        width: moderateScale(20),
        resizeMode: 'contain',
    },
    text: {
        fontSize: moderateScale(19),
        fontWeight: '500',
        letterSpacing: 1,
        marginLeft: moderateScale(9),
    },
});
