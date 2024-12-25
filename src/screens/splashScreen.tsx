import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Video from 'react-native-video';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/Dimensions';
import { navigate } from '../utils/NavigationUtils';

const videos = [
    require('../assets/Reels/SplashScreen.mp4'),
];

const SplashScreen = () => {

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('Sign In');
        }, 6600);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Video
                style={styles.video}
                source={videos[0]}
                resizeMode='contain'
            />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    video: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
})