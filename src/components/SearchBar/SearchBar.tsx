import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { vh, vw } from '../../constants/Dimensions'
import { TextInput } from 'react-native'
import { Images } from '../../assets'

const SearchBar = ({ onSearch }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.roadmaptext}>Roadmap for your journey</Text>
            <View style={styles.containertextinput}>
                <Image source={Images.searchRoadmaps} />
                <TextInput
                    placeholder="Search for roadmaps"
                    placeholderTextColor="#9BA3AF"
                    style={styles.textinput}
                    onChangeText={onSearch}
                />
            </View>

        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    containertextinput: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: vh(20),
        backgroundColor: '#152426',
        borderRadius: 7,
        padding: 15
    },
    textinput: {
        fontSize: 20,
        color: 'white',
        paddingHorizontal: vw(12)
    },
    roadmaptext: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24
    },
    container: {
        backgroundColor: '#24454C',
        borderRadius: 10,
        padding: 25,
        // margin: vh(15),
        flex: 1
    }
})