// done

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import NameText from '../SignUp/NameAndTextBox/NameText';
import Button from '../SignUp/Button/Button';
import SignInWithGoogle from '../SignUp/Button/SignInWithGoogle';
import { moderateScale } from 'react-native-size-matters';

const SignInBody = () => {
    return (
        <View style={styles.container}>

            {/* Header */}
            <Text style={styles.createAccount}>Login to your account</Text>

            {/* Input fields */}
            <View style={styles.textinputcontainer}>
                <NameText name={null} placeholder={'Email'} width={moderateScale(300)} />
                <NameText name={null} placeholder={'Password'} width={moderateScale(300)} />
            </View>


            {/* Sign In Button */}
            <Button name="Sign in" />

            {/* Divider Section */}
            <View style={styles.orcontainer}>
                <View style={styles.continuewithcontainer} />
                <Text style={styles.or}>Or continue with</Text>
            </View>

            {/* Google Sign-In */}
            <SignInWithGoogle />

        </View>
    );
};

export default SignInBody;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: moderateScale(13),
        marginTop: moderateScale(40),
        backgroundColor: '#091317',
        padding: moderateScale(30),
        alignItems:'center',
    },
    continuewithcontainer: {
        borderWidth: moderateScale(1),
        borderColor: '#545A5C',
        width: '100%',
        position: 'absolute',
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
        fontSize: moderateScale(17),
        fontWeight: '600',
        marginTop: moderateScale(15),
    },
    or: {
        color: 'white',
        textAlign: 'center',
        fontSize: moderateScale(19),
        backgroundColor: '#152426',
        width: moderateScale(148),
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    orcontainer: {
        marginBottom: moderateScale(30),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: moderateScale(30),
    },
    textinputcontainer:{
        gap:moderateScale(12),
        alignItems:'center',
        marginTop:moderateScale(22),
    },
});
