// done

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import NameText from './NameAndTextBox/NameText';
import Button from './Button/Button';
import SignInWithGoogle from './Button/SignInWithGoogle';
import { moderateScale } from 'react-native-size-matters';

const SignUpBody = () => {
    return (
        <View style={styles.container}>

            <Text style={styles.createAccount}>Create your account</Text>

            <Text style={styles.enterdetails}>Enter your details below to get started</Text>

            <View style={styles.firstlastnames}>
                <NameText name={'First Name'} placeholder={'Enter your first  name'} width={moderateScale(150)} />
                <NameText name={'Last Name'} placeholder={'Enter your last  name'} width={moderateScale(150)} />
            </View>

            <View style={styles.centeralign}>

                <NameText name={'Email'} placeholder={'example@gmail.com'} width={moderateScale(300)} />

                <NameText name={'Phone Number'} placeholder={'0000000000'} width={moderateScale(300)} />

                <NameText name={'Password'} placeholder={'Enter your password'} width={moderateScale(300)} />

                <NameText name={'Confirm Password'} placeholder={'Confirm your password'} width={moderateScale(300)} />

                <Button name="Sign up" />

                <Text style={styles.or}>or</Text>

                <SignInWithGoogle />

            </View>

        </View>
    );
};

export default SignUpBody;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(40),
        backgroundColor: '#091317',
        padding: moderateScale(29),
    },
    firstlastnames: {
        marginTop: moderateScale(12),
        flexDirection: 'row',
        justifyContent: 'center',
    },
    createAccount: {
        color: 'white',
        textAlign: 'center',
        fontSize: moderateScale(26),
        fontWeight: '800',
    },
    enterdetails: {
        color: '#BDBDBD',
        textAlign: 'center',
        fontSize: moderateScale(15),
        fontWeight: '600',
        marginTop: moderateScale(15),
    },
    or: {
        color: '#9BA3AF',
        textAlign: 'center',
        marginTop: moderateScale(15),
        marginBottom: moderateScale(15),
    },
    centeralign: {
        alignItems: 'center',
    },
});
