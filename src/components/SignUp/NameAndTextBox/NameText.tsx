// done

import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import auth from '@react-native-firebase/auth';
import { setCredentials } from '../../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';




interface NameTextProps {
    name: string | null;
    placeholder: string;
    width: number | null;
}

const NameText: React.FC<NameTextProps> = ({ name, placeholder, width }) => {
    const { email, password, error } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const [inputText, setInputText] = useState('');

    const onTextChange = (text: any) => {
        setInputText(text)
        {
            placeholder === 'Email' &&
                dispatch(setCredentials({ email: text, password }))
        }
        {
            placeholder === 'Password' &&
                dispatch(setCredentials({ email, password: text }))
        }
    }


    return (

        <View>

            {name &&
                <Text style={styles.name}>{name}</Text>
            }

            <TextInput
                placeholder={placeholder}
                style={[styles.textinput, { width }]}
                placeholderTextColor="#6A7280"
                value={inputText}
                onChangeText={(text) => onTextChange(text)}
            />

        </View>
    );
};

export default NameText;

const styles = StyleSheet.create({
    name: {
        color: '#D1D5DA',
        fontSize: moderateScale(16),
        marginTop: moderateScale(22),
        fontWeight: '600',
    },
    textinput: {
        borderColor: '#656A6C',
        borderWidth: moderateScale(1),
        marginTop: moderateScale(10),
        borderRadius: moderateScale(8),
        padding: moderateScale(12),
        fontSize: moderateScale(18),
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#222B2D',
        height: moderateScale(55),
    },
});
