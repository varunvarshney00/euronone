import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import Header from '../components/HomeScreen/Header';
import { moderateScale } from 'react-native-size-matters';
import DropDownItem from '../components/Profile/DropDownItem';
import Footer from '../components/HomeScreen/Footer';
import { Images } from '../assets';

const Profile = () => {
    const user = auth().currentUser;
    // console.log("user-->", user?.displayName?.split(' ').reverse().pop())

    return (
        <SafeAreaView style={styles.container}>

            <Header user={user} />

            <ScrollView>

                <View>
                    {/* avatar */}
                    <View style={styles.avatarcontainer}>
                        {user?.photoURL ? (
                            <Image source={{ uri: user.photoURL }} style={styles.avatar} />
                        ) : (
                            <Image source={Images.avatarimage} style={styles.avatar} />
                        )}
                    </View>


                    {/* name */}
                    <Text style={styles.name}>
                        {user?.displayName ? (user.displayName) : <Text>User Name</Text>}
                    </Text>

                    {/* username */}
                    <Text style={styles.username}>@{user?.displayName ? user.displayName?.split(' ').reverse().pop() : <Text>user</Text>}</Text>
                </View>

                <View>
                    <DropDownItem label={'Profile'} />
                    <DropDownItem label={'Settings'} />
                    <DropDownItem label={'Invoice'} />
                    <DropDownItem label={'Euron Org'} />
                </View>

                <TouchableOpacity style={styles.logcontainer}>
                    <Text style={styles.logout}>Log Out</Text>
                </TouchableOpacity>

                <Footer />

            </ScrollView>

        </SafeAreaView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#040E12',
    },
    name: {
        color: 'white',
        fontWeight: '700',
        fontSize: moderateScale(31),
        textAlign: 'center',
    },
    username: {
        color: '#9BA3AF',
        fontSize: moderateScale(20),
        textAlign: 'center',
        marginTop: moderateScale(10),
        marginBottom: moderateScale(24),
    },
    avatar: {
        height: moderateScale(125),
        width: moderateScale(125),
        borderRadius: 100,
        backgroundColor: 'white',
    },
    avatarcontainer: {
        alignItems: 'center',
        marginTop: moderateScale(15),
        marginBottom: moderateScale(15),
        borderWidth: 1,
    },
    logcontainer: {
        borderColor: '#0A99AC',
        borderWidth: 1,
        padding: 15,
        borderRadius: moderateScale(10),
        marginBottom: moderateScale(30),
        marginTop: moderateScale(30),
    },
    logout: {
        color: '#0A99AC',
        textAlign: 'center',
        fontSize: moderateScale(20),
        fontWeight: '800',
    },
});
