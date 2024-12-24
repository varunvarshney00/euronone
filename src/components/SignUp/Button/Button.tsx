// done

import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { resetAndNavigate } from '../../../utils/NavigationUtils';
import { moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
// import { signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { setAuthState, setError } from '../../../redux/authSlice';
// import { getAuth } from '@react-native-firebase/auth';
// import { auth } from '../../../redux/firebaseConfig';
import auth from '@react-native-firebase/auth';

interface ButtonProps {
    name: string;
}

const Button: React.FC<ButtonProps> = ({ name }) => {
    const dispatch = useDispatch();
    const { email, password, error } = useSelector((state) => state.auth);
    console.log('email-->', email)
    console.log('pass-->', password)

    const handleButtonPress = async () => {
        if (name === 'Sign in') {
            try {
                const userCredentials = await auth().signInWithEmailAndPassword(email, password);
                console.log('auth-->',auth() )
                // console.log('usercredentials-->', userCredentials)
                if (userCredentials) {
                    resetAndNavigate('Home Screen');
                    Alert.alert('You have logged in successfully.')
                }
                else {
                    console.log('run')
                }

                dispatch(setAuthState({ isAuthenticated: true }));
                console.log('user logged in-->', userCredentials.user)
            } catch (error) {
                dispatch(setError(err.message));
            }
        }
        if (name === 'Sign up') {
            console.log('signup');
        }
    }

    return (
        <TouchableOpacity onPress={() => handleButtonPress()}>

            <View style={styles.buttoncontainer}>
                <Text style={styles.button}>{name}</Text>
            </View>

        </TouchableOpacity>

    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        color: 'white',
        fontSize: moderateScale(19),
        fontWeight: '700',
        textShadowColor: 'white',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 1,
    },
    buttoncontainer: {
        width: moderateScale(300),
        alignItems: 'center',
        justifyContent: 'center',
        height: moderateScale(53),
        borderRadius: moderateScale(8),
        backgroundColor: '#0A99AC',
        marginTop: moderateScale(32),
    },
});
