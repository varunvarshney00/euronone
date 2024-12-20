import { FlatList, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { vh } from '../../constants/Dimensions';
import axios, { Axios } from 'axios';
import { Images } from '../../assets';
import LinearGradient from 'react-native-linear-gradient';
import { navigate } from '../../utils/NavigationUtils';


const IMAGEDATA = [
    Images.im1,
    Images.im2,
    Images.im3,
    Images.im4,
    Images.im5,
    Images.im6,
    Images.im7,
    Images.im8,
    Images.im9,
    Images.im10,
];


const PopularCourses = () => {
    const [DATA, setDATA] = useState([]);

    const renderItem = ({ item }) => {
        return (

            <View style={{ height: 400, width: 300, borderColor: '#fff' }}>

                <LinearGradient colors={['#090D1A', '#03151F', 'black']} start={{ x: 0, y: 0.5 }} end={{ x: 0.5, y: 0 }} style={{ flex: 1, }}>



                    <View style={{ flex: 0.5, }}>
                        <Image source={{ uri: item.webThumbnailUrl}} style={styles.courseimage} />
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
                                backgroundColor: '#072232'
                            }}>
                                <Image source={Images.shoppingCart} style={styles.shoppingCart} />
                            </View>
                            <View style={{
                                height: 45, width: 45, padding: 10,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#072232'
                            }}>
                                <Image source={Images.shareIcon} style={styles.shareIcon} />

                            </View>
                        </View>

                    </View>
                </LinearGradient>;.

            </View >

        );
    };

    // useEffect(() => {
    //     axios.get('https://api.euron.one/api/v1/courses/popular?page=1&limit=10')
    //         .then(response => {
    //             const apiData = response.data.data;
    //             const combined = apiData.map((course, index) => ({
    //                 ...course,
    //                 image: IMAGEDATA[index % IMAGEDATA.length],
    //             }))
    //             setDATA(combined);
    //         })
    //         .catch(error => {
    //             console.log('error=>', error);
    //         });
    // }, []);

    useEffect(() => {
        axios.get('https://api.euron.one/api/v1/courses/popular?page=1&limit=10')
            .then(response => {
                const updatedData = response.data.data.map((item) => {
                    const filename = item.webThumbnailUrl.split('/').pop();
                    return {
                        ...item,
                        webThumbnailUrl: `https://euron.one/_next/image?url=https%3A%2F%2Feuron-prod-thumbnails.s3.ap-south-1.amazonaws.com%2Fcourse%2F${filename}&w=750&q=75`,
                    };
                });
                setDATA(updatedData);
            })
            .catch(error => {
                console.log('error=>', error);
            });
    }, []);



    return (
        <View>
            <View style={styles.heading}>
                <Text style={styles.livecoursestext}>Popular Courses</Text>
                <Text style={styles.seealltext}>See all</Text>
            </View>

            <FlatList
                data={DATA}
                renderItem={renderItem}
                horizontal

                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />

        </View>

    );
};

export default PopularCourses;

const styles = StyleSheet.create({
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
        height: "100%",
        width: "100%",
        resizeMode: 'contain',
        borderRadius: 20,
    },
    descriptioncontainer: {
        justifyContent: 'center',
        padding: 20
    },
    courseCotainer: {
        borderRadius: 25,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'


    },
    separator: {
        width: 22,
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
        resizeMode: 'contain'
    },
    instructorText: {
        color: 'white'
    },
    samestyles: {
        color: 'white',

    },
    enrollNow: {
        color: '#0A99AC',
        fontWeight: '700',
        fontSize: 15
    },
    enrollNowContainer: {
        borderWidth: 1,
        borderColor: '#0A99AC',
        height: 45,
        width: 150,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shoppingCart: {
        tintColor: 'white',
        height: 20,
        width: 20
    },
    shareIcon: {
        tintColor: 'white',
        height: 20,
        width: 20
    },
    enrollBigContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15
    },
    linearGradient: {
        width: 320,
        padding: 7,
        justifyContent: 'center',
        height: 400
    },
});
