// done

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { resetAndNavigate } from '../../../utils/NavigationUtils';
import { moderateScale } from 'react-native-size-matters';

interface ButtonProps {
    name: string;
}

const Button: React.FC<ButtonProps> = ({ name }) => {
    return (
        <TouchableOpacity onPress={() => { resetAndNavigate('Home Screen'); }}>

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
