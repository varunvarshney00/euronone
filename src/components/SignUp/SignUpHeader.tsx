// done

import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Images } from '../../assets';
import { colors } from '../../constants/Colors';
import { replace } from '../../utils/NavigationUtils';
import { moderateScale } from 'react-native-size-matters';

const SignUpHeader = () => {
    return (
        <SafeAreaView style={styles.safearea}>

            <View style={styles.container}>

                {/* Logo */}
                <Image source={Images.mainLogo} style={styles.mainlogo} />

                {/* Sign In Section */}
                <View style={styles.alreadySign}>
                    <Text style={styles.alreadyAccount}>Already have an Account?</Text>

                    <TouchableOpacity onPress={() => replace('Sign In')}>
                        <Text style={styles.signin}>Sign In</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </SafeAreaView>
    );
};

export default SignUpHeader;


const styles = StyleSheet.create({
    safearea: {
        backgroundColor: colors.black,
    },
    container: {
        flexDirection: 'row',
        backgroundColor: colors.black,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: moderateScale(25),
    },
    mainlogo: {
        tintColor: 'white',
        width: moderateScale(93),
        resizeMode: 'contain',
    },
    alreadyAccount: {
        color: 'white',
        fontWeight: '600',
        fontSize: moderateScale(12),
    },
    signin: {
        color: '#0E99AD',
        fontWeight: '700',
        fontSize: moderateScale(15),
    },
    alreadySign: {
        flexDirection: 'row',
        gap: moderateScale(8),
        alignItems: 'center',
    },

});
