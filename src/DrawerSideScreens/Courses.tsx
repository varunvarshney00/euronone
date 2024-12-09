import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/HomeScreen/Header';
import Footer from '../components/HomeScreen/Footer';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { Images } from '../assets';
import { vh } from '../constants/Dimensions';
import { navigate } from '../utils/NavigationUtils';

const Courses = () => {
  const [webinars, setWebinars] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.euron.one/api/v1/courses?page=1&limit=100')
      .then((response) => {
        const apiData = response.data.data;
        const updatedData = apiData.map((item) => {
          const filename = item.webThumbnailUrl.split('/').pop();
          return {
            ...item,
            webThumbnailUrl: `https://euron.one/_next/image?url=https%3A%2F%2Feuron-prod-thumbnails.s3.ap-south-1.amazonaws.com%2Fcourse%2F${filename}&w=750&q=75`,
          };
        });
        setWebinars(updatedData);
      })
      .catch((error) => {
        console.log('error=>', error);
      });
  }, []);

  const renderItem = ({ item }) => {

    return (

      <View style={styles.courseContainer}>

        <LinearGradient
          colors={['#090D1A', '#03151F', 'black']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0.5, y: 0 }}
          style={styles.gradientContainer}
        >

          <View style={styles.imageContainer}>
            <Image source={{ uri: item.webThumbnailUrl }} style={styles.courseImage} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={styles.instructorContainer}>
              <View style={styles.instructorInfo}>
                <Image source={Images.profileIcon} style={styles.profileIcon} />
                <Text style={styles.instructorText}>  {item.instructorInfo[0].fullName}</Text>
              </View>
              <Text style={styles.priceText}>₹{item.mobilePriceINR}</Text>
            </View>

            <View style={styles.detailsContainer}>
              <Text style={styles.detailsText}>{item.language}</Text>
              <Text style={styles.detailsText}>{item.duration}</Text>
              <Text style={styles.detailsText}>{item.lecturesCount} lectures</Text>
            </View>

            <View style={styles.actionsContainer}>

              <TouchableOpacity onPress={() => navigate('Inside A Course', { id: item.id })}>
                <View style={styles.enrollButton}>
                  <Text style={styles.enrollText}>Enroll Now</Text>
                </View>
              </TouchableOpacity>

              {/* <View style={styles.iconContainer}>
                <Image source={Images.shoppingCart} style={styles.icon} />
              </View> */}

              <View style={styles.iconContainer}>
                <Image source={Images.shareIcon} style={styles.icon} />
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (

    <SafeAreaView style={styles.container}>

      <Header user={null} />

      <ScrollView style={styles.container}>

        <View style={styles.flatListContainer}>

          <FlatList
            data={webinars}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />

        </View>

        <Footer />

      </ScrollView>

    </SafeAreaView>

  );
};

export default Courses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040E12',
  },
  flatListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 12,
  },
  separator: {
    height: 20,
  },
  courseContainer: {
    height: 400,
    width: 350,
    borderColor: '#fff',
  },
  gradientContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 0.5,
  },
  courseImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 20,
  },
  infoContainer: {
    flex: 0.5,
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    fontWeight: '800',
    fontSize: 17,
    marginTop: 25,
  },
  instructorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  instructorInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  profileIcon: {
    tintColor: 'white',
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  instructorText: {
    color: 'white',
    fontWeight: '700'
  },
  priceText: {
    color: '#7FB260',
    fontWeight: '700',
    fontSize: 16,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  detailsText: {
    color: 'white',
    fontWeight: '700'
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  enrollButton: {
    borderWidth: 1,
    borderColor: '#0A99AC',
    height: 45,
    width: 250,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enrollText: {
    color: '#0A99AC',
    fontWeight: '800',
    fontSize: 16,
  },
  iconContainer: {
    height: 45,
    width: 45,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#072232',
  },
  icon: {
    tintColor: 'white',
    height: 20,
    width: 20,
  },
});
