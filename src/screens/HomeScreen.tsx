import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../components/HomeScreen/Header';
import { vw } from '../constants/Dimensions';
import GoodMorning from '../components/HomeScreen/GoodMorning';
import Categories from '../components/HomeScreen/Categories';
import FlatBytes from '../components/HomeScreen/FlatBytes';
import Reels from '../components/HomeScreen/Reelz/Reels';
import auth from '@react-native-firebase/auth';
import LiveCourses from '../components/HomeScreen/LiveCourses';
import Books from '../components/HomeScreen/Books';
import { moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import PopularCourses from '../components/HomeScreen/PopularCourses';
import NewlyAddedCourses from '../components/HomeScreen/NewlyAddedCourses';
import Footer from '../components/HomeScreen/Footer';

const HomeScreen = ({ navigation }) => {

  // console.log('navigation-->', navigation)

  const user = auth().currentUser;
  // const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header user={user}/>
        {/* <GoodMorning /> */}
        <Categories />
        {/* <Reels /> */}
        <LiveCourses />
        <PopularCourses/>
        <NewlyAddedCourses/>
        {/* <FlatBytes /> */}

        {/* <Books /> */}
        <Footer/>
      </ScrollView>

    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: moderateScale(20),
  },
});
