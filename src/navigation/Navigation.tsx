// done

import React, { FC } from 'react';
import { navigationrRef } from '../utils/NavigationUtils';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// screens
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import InsideACourse from '../screens/InsideACourse';
import DrawerOnBurgerIcon from '../components/Drawer/DrawerOnBurgerIcon';
import Roadmap from '../DrawerSideScreens/Roadmap';
import Profile from '../screens/Profile';
import Notifications from '../screens/Notifications';
import MyLearning from '../screens/MyLearning';
import Analytics from '../screens/Analytics';
import MyCart from '../screens/MyCart';
import CourseDescriptionScreen from '../components/InsideACourse/CourseDescriptionScreen';
import SplashScreen from '../screens/splashScreen';


const Stack = createNativeStackNavigator();



const Navigation: FC = () => {
    return (
        <NavigationContainer ref={navigationrRef}>

            <Stack.Navigator initialRouteName="Sign In" screenOptions={{ headerShown: false }}>

                <Stack.Screen name="Sign In" component={SignIn} />

                <Stack.Screen name="Sign Up" component={SignUp} />

                <Stack.Screen name="Home Screen" component={DrawerOnBurgerIcon} />

                <Stack.Screen name="Inside A Course" component={InsideACourse} />

                <Stack.Screen name="Drawer Screen" component={DrawerOnBurgerIcon} />

                <Stack.Screen name="Roadmap" component={Roadmap} />

                <Stack.Screen name="Profile" component={Profile} />

                <Stack.Screen name="My Cart" component={MyCart} />

                <Stack.Screen name="Analytics" component={Analytics} />

                <Stack.Screen name="My Learning" component={MyLearning} />

                <Stack.Screen name="Notifications" component={Notifications} />

                <Stack.Screen name="Splash Screen" component={SplashScreen} />

                <Stack.Screen name="Course Description Screen" component={CourseDescriptionScreen} />

            </Stack.Navigator>

        </NavigationContainer>
    );
};

export default Navigation;
