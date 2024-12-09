import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import BookContainer from '../../subComponents/books/BookContainer';


const Books = () => {
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.freebooktext}>Free Books</Text>
                <Text style={styles.seealltext}>See all</Text>
            </View>
            <BookContainer/>


        </View>

    );
};

export default Books;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    freebooktext: {
        color: 'white',
        fontWeight: '800',
        fontSize: moderateScale(25),
    },
    seealltext: {
        color: '#0A99AC',
        fontWeight: '400',
        fontSize: moderateScale(20),
    },
});
