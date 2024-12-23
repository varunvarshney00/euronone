// done

import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import auth from '@react-native-firebase/auth';


interface NameTextProps {
    name: string | null;
    placeholder: string;
    width: number | null;
}

const NameText: React.FC<NameTextProps> = ({ name, placeholder, width }) => {
    const [inputText, setInputText] = useState('');
    // console.log('it-->', inputText);


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
                onChangeText={setInputText}
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
