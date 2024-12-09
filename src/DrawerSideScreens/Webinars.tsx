import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/HomeScreen/Header';
import Footer from '../components/HomeScreen/Footer';
import { Images } from '../assets';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { vh } from '../constants/Dimensions';
import { ScrollView } from 'react-native-gesture-handler';
import { navigate } from '../utils/NavigationUtils';


const Webinars = () => {

    const [webinars, setWebinars] = useState([]);

    useEffect(() => {
        axios.get('https://api.euron.one/api/v1/courses/webinars')

            .then(response => {

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
            .catch(error => {
                console.log('error=>', error);
            });
    }, []);



    const renderItem = ({ item }) => {
        return (

            <View style={{ height: 400, width: 300, borderColor: '#fff' }}>

                <LinearGradient colors={['#090D1A', '#03151F', 'black']} start={{ x: 0, y: 0.5 }} end={{ x: 0.5, y: 0 }} style={{ flex: 1 }}>

                    <View style={{ flex: 0.5 }}>
                        <Image source={{ uri: item.webThumbnailUrl }} style={styles.courseimage} />
                        {/* <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} /> */}

                    </View>



                    <View style={{ flex: 0.5, paddingHorizontal: 20 }}>

                        <Text style={styles.title} numberOfLines={1}>{item.title} </Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>

                            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                <Image source={Images.profileIcon} style={styles.profilestyling} />
                                <Text style={styles.instructorText}>  {item.instructorInfo[0].fullName}</Text>
                            </View>

                            <Text style={styles.mobilePriceINR}>{item.mobilePriceINR}</Text>

                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                            <Text style={styles.samestyles}>{item.language}</Text>
                            <Text style={styles.samestyles}>{item.duration}</Text>
                            <Text style={styles.samestyles}>{item.lecturesCount} lectures</Text>
                        </View>

                        <View style={styles.enrollBigContainer}>

                            <TouchableOpacity onPress={() => navigate('Inside A Course', { id: item.id })}>

                                <View style={styles.enrollNowContainer}>
                                    <Text style={styles.enrollNow}>Enroll Now</Text>
                                </View>

                            </TouchableOpacity>


                            <View style={{
                                height: 45, width: 45, padding: 10,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#072232',
                            }}>
                                <Image source={Images.shoppingCart} style={styles.shoppingCart} />
                            </View>


                            <View style={{
                                height: 45, width: 45, padding: 10,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#072232',
                            }}>
                                <Image source={Images.shareIcon} style={styles.shareIcon} />

                            </View>
                        </View>

                    </View>
                </LinearGradient>;.

            </View >

        );
    };

    return (
        <ScrollView>

            <SafeAreaView style={styles.container}>

                <Header user={null} />

                <View style={styles.headingcontainer}>
                    <Text style={styles.textwebinar}>Explore webinar</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 12 }}>
                    <FlatList
                        data={webinars}
                        renderItem={renderItem}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                </View>

                <Footer />

            </SafeAreaView>

        </ScrollView>

    );
};

export default Webinars;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    textwebinar: {
        color: '#0A99AC',
        fontWeight: '800',
        fontSize: 30,
    },
    headingcontainer: {
        backgroundColor: '#24454C',
        padding: 15,
        borderRadius: 10,
    },
    mobilePriceINR: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    livecoursestext: {
        color: 'white',
        fontWeight: '800',
        fontSize: 24,
    },
    seealltext: {
        color: '#0E99AD',
        textAlign: 'right',
        fontSize: 20,
        fontWeight: '600',
    },
    title: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        marginTop: 25,
    },
    imagestyle: {
        color: 'white',
    },
    courseimage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        borderRadius: 20,
    },
    descriptioncontainer: {
        justifyContent: 'center',
        padding: 20,
    },
    courseCotainer: {
        borderRadius: 25,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',


    },
    separator: {
        height: 20,
    },
    heading: {
        marginTop: vh(23),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profilestyling: {
        tintColor: 'white',
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    instructorText: {
        color: 'white',
    },
    samestyles: {
        color: 'white',

    },
    enrollNow: {
        color: '#0A99AC',
        fontWeight: '700',
        fontSize: 15,
    },
    enrollNowContainer: {
        borderWidth: 1,
        borderColor: '#0A99AC',
        height: 45,
        width: 150,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shoppingCart: {
        tintColor: 'white',
        height: 20,
        width: 20,
    },
    shareIcon: {
        tintColor: 'white',
        height: 20,
        width: 20,
    },
    enrollBigContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    linearGradient: {
        width: 320,
        padding: 7,
        justifyContent: 'center',
        height: 400,
    },
});
