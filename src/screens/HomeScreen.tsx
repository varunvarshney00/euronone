// THIS IS OUR MAIN HOMESCREEN

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

// SCREENS
import Header from '../components/HomeScreen/Header';
// import GoodMorning from '../components/HomeScreen/GoodMorning';
import Categories from '../components/HomeScreen/Categories';
import LiveCourses from '../components/HomeScreen/LiveCourses';
import PopularCourses from '../components/HomeScreen/PopularCourses';
import NewlyAddedCourses from '../components/HomeScreen/NewlyAddedCourses';
import Footer from '../components/HomeScreen/Footer';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>

      <ScrollView>
        {/* The header inside screens. */}
        <Header />

        {/* Good Morning User animation */}
        {/* WIP */}
        {/* <GoodMorning /> */}

        {/* Tech Categories */}
        <Categories />

        {/* Live Courses List */}
        <LiveCourses />

        {/* Popular Courses List */}
        <PopularCourses />

        {/* Newly Added Courses List */}
        <NewlyAddedCourses />

        {/* Main Footer of our app. */}
        <Footer />
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
