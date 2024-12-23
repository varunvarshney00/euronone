import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import HomeScreen from '../../screens/HomeScreen';
import Bytes from '../../DrawerSideScreens/Bytes';
import EuronPlus from '../../DrawerSideScreens/EuronPlus';
import EuronOrg from '../../DrawerSideScreens/EuronOrg';
import EuronAssist from '../../DrawerSideScreens/EuronAssist';
import { vh } from '../../constants/Dimensions';
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
  return (
    <View {...props} style={styles.drawerContainer}>
      {drawerItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.drawerItem}
          onPress={() => props.navigation.navigate(item.screen)}
        >
          <Image source={item.icon} style={styles.icon} />
          <Text style={styles.drawerLabel}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const DrawerOnBurgerIcon: React.FC = () => {
  return (
    <Drawer.Navigator
      backBehavior="history"
      initialRouteName="Home Screen"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: 'front',
        // swipeEnabled:false,
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#061115',
          width: '65%',
          justifyContent: 'center',
          paddingHorizontal: 40,
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
    </Drawer.Navigator>
  );
};

export default DrawerOnBurgerIcon;

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: '#061115',
    marginTop: vh(40),
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vh(15),
    marginBottom: 5,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 15,
  },
  drawerLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  sectionHeader: {
    color: '#26A69A',
    fontSize: 17,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
