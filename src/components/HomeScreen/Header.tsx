/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
    Alert,
    Image,
    StyleSheet,
    Text, TouchableOpacity,
    View,
    FlatList,
} from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { Images } from '../../assets';
import { navigate, resetAndNavigate } from '../../utils/NavigationUtils';
import { moderateScale } from 'react-native-size-matters';

interface HeaderProps {
    user?: {
        photoURL?: string;
    };
}

interface DropdownItem {
    id: string;
    label: string;
    screen: string;
    img: any;
}

const Header: React.FC<HeaderProps> = ({ user }) => {

    // const navigation = useNavigation();
    const [showList, setShowList] = useState(false);
    const navigation = useNavigation();

    // Drop down items json
    const dropdownItems: DropdownItem[] = [
        { id: '1', label: 'My Profile', screen: 'Profile', img: Images.myprofile },
        { id: '2', label: 'My Cart', screen: 'My Cart', img: Images.shoppingCart },
        { id: '3', label: 'Analytics', screen: 'Analytics', img: Images.analytics },
        { id: '4', label: 'My Learning', screen: 'My Learning', img: Images.mylearning },
        { id: '5', label: 'Notifications', screen: 'Notifications', img: Images.notificationbell },
        { id: '6', label: 'Logout', screen: 'Logout', img: Images.logout },
    ];

    // When any item is pressed inside drop down list.
    const handleItemPress = async (screen: string) => {
        if (screen === 'Logout') {
            const auth = getAuth();
            if (!auth.currentUser) {
                // User is already logged out
                resetAndNavigate('Sign In');
                Alert.alert('Info', 'You are already logged out.');
                return;
            }

            try {
                await signOut(auth);
                console.log('User logged out Successfully');
                resetAndNavigate('Sign In');
            } catch (error) {
                console.error('Error logging out:', error);
                Alert.alert('Error', 'An error occurred while logging out. Please try again.');
            }
        } else {
            if (screen) {
                navigate(screen);
            }
        }
        setShowList(false);
    };

    // Main return component
    return (

        // Full header
        <View style={styles.container}>

            {/* Left side of header */}
            <View style={styles.leftContainer}>
                {/* Burger */}
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <Image source={Images.menu} style={styles.burgerLogo} />
                </TouchableOpacity>

                {/* Euron logo */}
                <View style={styles.logoContainer}>
                    <Image source={Images.mainLogo} style={styles.mainLogo} />
                    <Text style={styles.orgText}>Org</Text>
                </View>
            </View>

            {/* Right side of the header */}
            <View style={styles.rightContainer}>
                <Image source={Images.search} style={styles.searchLogo} />

                {/* Avatar and drop down */}
                <View style={styles.avatarDropdownContainer}>

                    {/* Avatar */}
                    {user?.photoURL ? (
                        <Image source={{ uri: user.photoURL }} style={styles.avatar} />
                    ) : (
                        <Image source={Images.avatarimage} style={styles.avatar} />
                    )}

                    {/* Dropdown list */}
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
                                        <Image source={item.img} style={[styles.icon, item.label === 'Logout' ? { tintColor: '#F77171' } : null]} />
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
        height: moderateScale(70),
        flexDirection: 'row',
        backgroundColor: '#071516',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(15),
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: moderateScale(181),
    },
    logoContainer: {
        flexDirection: 'row',
        marginLeft: moderateScale(12),
    },
    orgText: {
        color: '#26A69A',
        fontWeight: '900',
        fontSize: moderateScale(16),
        marginTop: moderateScale(-7),
    },
    mainLogo: {
        tintColor: 'white',
        height: moderateScale(24),
        width: moderateScale(93),
        resizeMode: 'contain',
    },
    burgerLogo: {
        height: moderateScale(40),
        width: moderateScale(40),
        tintColor: 'white',
        resizeMode: 'contain',
    },
    rightContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        width: moderateScale(101),
        justifyContent: 'space-between',
    },
    searchLogo: {
        height: moderateScale(30),
        width: moderateScale(30),
        tintColor: 'white',
        resizeMode: 'contain',
    },
    avatarDropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: moderateScale(55),
        justifyContent: 'space-between',
    },
    avatar: {
        height: moderateScale(35),
        width: moderateScale(35),
        borderRadius: 100,
        backgroundColor: 'white',
    },
    downArrow: {
        height: moderateScale(15),
        width: moderateScale(15),
        tintColor: 'white',
        resizeMode: 'contain',
    },
    dropdown: {
        position: 'absolute',
        top: moderateScale(45),
        right: moderateScale(10),
        backgroundColor: '#071516',
        borderRadius: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: moderateScale(240),
        zIndex: 1000,
        padding: moderateScale(4),
    },
    dropdownItem: {
        padding: moderateScale(10),
        flexDirection: 'row',
        alignItems: 'center',
    },
    dropdownText: {
        color: 'white',
        fontSize: moderateScale(18),
        fontWeight: '500',
    },
    icon: {
        height: moderateScale(20),
        width: moderateScale(20),
        resizeMode: 'contain',
        tintColor: 'white',
        margin: moderateScale(2),
        marginHorizontal: moderateScale(14),
    },
});
