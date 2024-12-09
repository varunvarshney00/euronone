import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Video from 'react-native-video';
import { DESIGN_HEIGHT } from '../../../constants/Dimensions';

const { height } = Dimensions.get('window');

const videoSources = 'https://www.w3schools.com/html/mov_bbb.mp4';

const Reels = () => {
    const videoRefs = useRef([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleViewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const newIndex = viewableItems[0].index;
            setCurrentIndex(newIndex);
        }
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.videoContainer}>
            <Video
                source={{uri:'https://www.w3schools.com/html/mov_bbb.mp4'}}
                ref={(ref) => (videoRefs.current[index] = ref)} // store the reference of each video
                paused={currentIndex !== index} // only play the current video
                resizeMode="cover"
                style={styles.backgroundVideo}
                repeat
            />
        </View>
    );

    return (
        <FlatList
            data={videoSources}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            pagingEnabled
            onViewableItemsChanged={handleViewableItemsChanged}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        />
    );
};

export default Reels;

const styles = StyleSheet.create({
    videoContainer: {
        height: height,
        width: '100%',
    },
    backgroundVideo: {
        height: DESIGN_HEIGHT,
        width: '100%',
    },
});
