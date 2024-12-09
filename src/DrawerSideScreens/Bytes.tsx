import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import { Images } from '../assets';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/Dimensions';
import { navigationrRef } from '../utils/NavigationUtils';

const Bytes = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const videos = [
    require('../assets/Reels/video1.mp4'),
    require('../assets/Reels/video2.mp4'),
    require('../assets/Reels/video3.mp4'),
    require('../assets/Reels/video4.mp4'),
  ];

  const handleScroll = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.y / SCREEN_HEIGHT);
    setSelectedIndex(index);
  };

  const handleGoBack = () => {
    setSelectedIndex(-1);
    navigationrRef.goBack();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={(_, index) => index.toString()}
        onScroll={handleScroll}
        pagingEnabled
        windowSize={2}
        snapToAlignment="start"
        decelerationRate="normal"
        scrollEventThrottle={16}
        onEndReachedThreshold={0.2}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        initialNumToRender={1}
        getItemLayout={(data, index) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * index,
          index,
        })}
        removeClippedSubviews
        renderItem={({ item, index }) => (
          <View style={styles.videoContainer}>
            {/* Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleGoBack}
            >
              <Image
                source={Images.backarrow}
                style={styles.backArrowIcon}
              />
            </TouchableOpacity>

            {/* Video Component */}
            <Video
              style={styles.video}
              paused={selectedIndex !== index}
              source={item}
              resizeMode="cover"
              repeat
            />

            {/* Pause Overlay */}
            <TouchableOpacity
              style={styles.overlay}
              onPress={() =>
                setSelectedIndex(selectedIndex === -1 ? index : -1)
              }
            >
              {selectedIndex === -1 && (
                <Image
                  source={Images.pause}
                  style={styles.pauseIcon}
                />
              )}
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Bytes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 100,
    backgroundColor: '#11151c',
    borderRadius: 100,
    opacity: 0.5,
    padding: 10,
  },
  backArrowIcon: {
    height: 45,
    width: 45,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  video: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  overlay: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseIcon: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
    tintColor: 'white',
  },
});
