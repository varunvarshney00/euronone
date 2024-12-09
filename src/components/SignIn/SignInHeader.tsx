// done

import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '../../assets';
import { colors } from '../../constants/Colors';
import { moderateScale } from 'react-native-size-matters';
import { replace } from '../../utils/NavigationUtils';

const SignInHeader = () => (
    <SafeAreaView>

        <View style={styles.container}>

            <Image source={Images.mainLogo} style={styles.mainLogo} />

            <View style={styles.signUpContainer}>

                <Text style={styles.accountText}>Don't have an Account?</Text>

                <TouchableOpacity onPress={() => replace('Sign Up')}>
                    <Text style={styles.signUpText}>Sign Up</Text>
                </TouchableOpacity>

            </View>

        </View>

    </SafeAreaView>
);

export default SignInHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.black,
        padding: moderateScale(25),
    },
    mainLogo: {
        tintColor: 'white',
        width: moderateScale(93),
        resizeMode: 'contain',
    },
    signUpContainer: {
        flexDirection: 'row',
        gap: moderateScale(8),
        alignItems: 'center',
    },
    accountText: {
        fontSize: moderateScale(14),
        color: 'white',
        fontWeight: '700',
    },
    signUpText: {
        fontSize: moderateScale(15),
        fontWeight: '700',
        color: '#0E99AD',
    },
});
