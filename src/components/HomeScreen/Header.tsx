import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import { Images } from '../../assets';
import { vh, vw } from '../../constants/Dimensions';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { navigationrRef } from '../../utils/NavigationUtils';
import { Alert } from 'react-native';
import { moderateScale } from 'react-native-size-matters';


const Header = ({ user }) => {
    const navigation = useNavigation();
    const [showList, setShowList] = useState(false);

    const myprofile = Images.myprofile;
    const mycart = Images.shoppingCart;
    const analytics = Images.analytics;
    const mylearning = Images.mylearning;
    const notifications = Images.notificationbell;
    const logout = Images.logout;

    const dropdownItems = [
        { id: '1', label: 'My Profile', screen: 'Profile', img: myprofile },
        { id: '2', label: 'My Cart', screen: 'My Cart', img: mycart },
        { id: '3', label: 'Analytics', screen: 'Analytics', img: analytics },
        { id: '4', label: 'My Learning', screen: 'My Learning', img: mylearning },
        { id: '5', label: 'Notifications', screen: 'Notifications', img: notifications },
        { id: '6', label: 'Logout', screen: 'Logout', img: logout },
    ];

    const handleItemPress = async (screen) => {
        if (screen === 'Logout') {
            const auth = getAuth();
            if (!auth.currentUser) {
                // User is already logged out
                Alert.alert('Info', 'You are already logged out.');
                return;
            }

            try {
                await signOut(auth);
                console.log('User logged out');
                navigation.navigate('Sign In');
            } catch (error) {
                console.error('Error logging out:', error);
                Alert.alert('Error', 'An error occurred while logging out. Please try again.');
            }
        } else {
            navigationrRef.navigate(screen);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <Image source={Images.menu} style={styles.burgerLogo} />
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <Image source={Images.mainLogo} style={styles.mainLogo} />
                    <Text style={styles.orgText}>Org</Text>
                </View>
            </View>

            <View style={styles.rightContainer}>
                <Image source={Images.search} style={styles.searchLogo} />
                <View style={styles.avatarDropdownContainer}>
                    {user?.photoURL ? (
                        <Image source={{ uri: user.photoURL }} style={styles.avatar} />
                    ) : (
                        <View style={styles.avatar} />
                    )}
                    <TouchableOpacity onPress={() => setShowList(!showList)}>
                        <Image source={Images.downarrow} style={styles.downArrow} />
                    </TouchableOpacity>


                    {/* My dropdown list */}
                    {showList && (
                        <View style={styles.dropdown}>
                            <FlatList
                                data={dropdownItems}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.dropdownItem}
                                        onPress={() => handleItemPress(item.screen)}
                                    >
                                        <Image source={item.img} style={[styles.icon, item.img === logout ? { tintColor: '#F77171' } : null]} />
                                        <Text style={[styles.dropdownText, item.label === 'Logout' ? { color: '#F77171' } : null]}>{item.label}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}


                </View>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        height: vh(80),
        flexDirection: 'row',
        backgroundColor: '#071516',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: vw(181),
    },
    logoContainer: {
        flexDirection: 'row',
    },
    orgText: {
        color: '#26A69A',
        fontWeight: '900',
        fontSize: 16,
        marginTop: -7,
    },
    mainLogo: {
        tintColor: 'white',
        height: vh(24),
        width: vw(93),
        resizeMode: 'contain',
    },
    burgerLogo: {
        height: vh(40),
        width: vw(40),
        tintColor: 'white',
    },
    rightContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        width: vw(101),
        justifyContent: 'space-between',
    },
    searchLogo: {
        height: vh(30),
        width: vh(30),
        tintColor: 'white',
        resizeMode: 'contain',
    },
    avatarDropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: vw(55),
        justifyContent: 'space-between',
    },
    avatar: {
        height: vh(35),
        width: vh(35),
        borderRadius: 100,
        backgroundColor: 'white',
    },
    downArrow: {
        height: vh(15),
        width: vw(15),
        tintColor: 'white',
        resizeMode: 'contain',
    },
    dropdown: {
        position: 'absolute',
        top: moderateScale(45),
        right: 10,
        backgroundColor: '#071516',
        borderRadius: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // borderWidth: 1,
        // borderColor: 'green',
        width: moderateScale(240),
        zIndex: 1000,
        padding: moderateScale(4)
    },
    dropdownItem: {
        padding: vh(10),
        flexDirection: 'row',
        alignItems: 'center'
        // borderBottomWidth: 2,
        // borderBottomColor: '#ddd',
    },
    dropdownText: {
        color: 'white',
        fontSize: moderateScale(18),
        fontWeight: '500'
    },
    icon: {
        height: moderateScale(20),
        width: moderateScale(20),
        resizeMode: 'contain',
        tintColor: 'white',
        margin: moderateScale(2),
        marginHorizontal: moderateScale(14)
    }
});
