// DONE

import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import HomeScreen from '../../screens/HomeScreen';
import Bytes from '../../DrawerSideScreens/Bytes';
import EuronPlus from '../../DrawerSideScreens/EuronPlus';
import EuronOrg from '../../DrawerSideScreens/EuronOrg';
import EuronAssist from '../../DrawerSideScreens/EuronAssist';
import { Images } from '../../assets';
import LiveCourses from '../../DrawerSideScreens/LiveCourses';
import Courses from '../../DrawerSideScreens/Courses';
import Roadmap from '../../DrawerSideScreens/Roadmap';
import Partnership from '../../DrawerSideScreens/Partnership';
import Webinars from '../../DrawerSideScreens/Webinars';
import Projects from '../../DrawerSideScreens/Projects';
import Books from '../../DrawerSideScreens/Books';
import CourseDescriptionScreen from '../InsideACourse/CourseDescriptionScreen';
import Profile from '../../screens/Profile';
import { moderateScale } from 'react-native-size-matters';
// import InsideACourse from '../../screens/InsideACourse';

const Drawer = createDrawerNavigator();

interface DrawerItem {
  label: string;
  icon: any;
  screen: string;
}

const drawerItems: DrawerItem[] = [
  { label: 'Home', icon: Images.drawerhome, screen: 'Home Screen' },
  { label: 'Bytes', icon: Images.drawerbytes, screen: 'Bytes' },
  { label: 'Euron Plus', icon: Images.drawerplus, screen: 'Euron Plus' },
  { label: 'Euron Org', icon: Images.drawerorg, screen: 'Euron Org' },
  { label: 'Euron Assist', icon: Images.drawerassist, screen: 'Euron Assist' },
  { label: 'Courses', icon: Images.drawercourses, screen: 'Courses' },
  { label: 'Books', icon: Images.drawerbooks, screen: 'Books' },
  { label: 'Projects', icon: Images.drawerprojects, screen: 'Projects' },
  { label: 'Live Courses', icon: Images.drawerlivecourses, screen: 'Live Courses' },
  { label: 'Webinars', icon: Images.drawerwebinars, screen: 'Webinars' },
  { label: 'Partnership', icon: Images.drawerpartnership, screen: 'Partnership' },
  { label: 'Roadmap', icon: Images.drawerroadmaps, screen: 'Roadmap' },
];

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { state } = props;
  const activeRoute = state?.routeNames[state.index];
  return (
    <View {...props} style={styles.drawerContainer}>
      {drawerItems.map((item, index) => {
        const isActive = activeRoute === item.screen;
        return (
          <TouchableOpacity
            key={index}
            style={[styles.drawerItem, isActive && styles.activeDrawerStyles]}
            onPress={() => props.navigation.navigate(item.screen)}
          >
            <Image source={item.icon} style={[styles.icon, isActive && styles.activeDrawerIcon]} />

            <Text style={[styles.drawerLabel, isActive && styles.activeDrawerLabel]}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const DrawerOnBurgerIcon = () => {
  return (
    <Drawer.Navigator
      backBehavior="history"
      initialRouteName="Home Screen"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: 'front',
        // WIP
        // swipeEnabled: false,
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#061115',
          width: '65%',
          justifyContent: 'center',
          paddingHorizontal: moderateScale(20),
        },
      }}
    >
      <Drawer.Screen name="Home Screen" component={HomeScreen} />
      <Drawer.Screen name="Bytes" component={Bytes} />
      <Drawer.Screen name="Euron Plus" component={EuronPlus} />
      <Drawer.Screen name="Euron Org" component={EuronOrg} />
      <Drawer.Screen name="Euron Assist" component={EuronAssist} />
      <Drawer.Screen name="Courses" component={Courses} />
      <Drawer.Screen name="Live Courses" component={LiveCourses} />
      <Drawer.Screen name="Roadmap" component={Roadmap} />
      <Drawer.Screen name="Partnership" component={Partnership} />
      <Drawer.Screen name="Webinars" component={Webinars} />
      <Drawer.Screen name="Projects" component={Projects} />
      <Drawer.Screen name="Books" component={Books} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Course Description Screen" component={CourseDescriptionScreen} />
      {/* <Drawer.Screen name="Inside A Course" component={InsideACourse} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerOnBurgerIcon;

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: '#061115',
    marginTop: moderateScale(40),
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(12),
    marginBottom: moderateScale(5),
  },
  icon: {
    width: moderateScale(24),
    height: moderateScale(24),
    resizeMode: 'contain',
    marginRight: moderateScale(15),
    marginLeft: moderateScale(15),
    tintColor: 'white'
  },
  drawerLabel: {
    color: 'white',
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  sectionHeader: {
    color: '#26A69A',
    fontSize: moderateScale(17),
    fontWeight: 'bold',
    marginVertical: moderateScale(10),
  },

  // ACTIVE DRAWER STYLES
  activeDrawerStyles: {
    backgroundColor: '#0D2527',
    borderRadius: moderateScale(12),
  },
  activeDrawerIcon: {
    tintColor: '#40E0D0',
  },
  activeDrawerLabel: {
    color: '#40E0D0',
  },
});
