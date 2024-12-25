import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import Header from '../HomeScreen/Header';
import auth from '@react-native-firebase/auth';
import Footer from '../HomeScreen/Footer';
import axios from 'axios';
import { moderateScale } from 'react-native-size-matters';
import { Images } from '../../assets';


type RootStackParamList = {
    CourseDescription: { id: string }
}

type CourseDescriptionScreenRouteProp = RouteProp<RootStackParamList, 'CourseDescription'>;

interface Props {
    route: CourseDescriptionScreenRouteProp;
}

interface CourseData {
    mobileThumbnailUrl?: string;
    title?: string;
    subTitle?: string;
    language?: string;
    startDate?: string;
    classTiming?: string;
    learningOutcomes?: string[];
    offerings?: string[];
    id?: string[];
}


const user = auth().currentUser;


const CourseDescriptionScreen: React.FC<Props> = ({ route }) => {

    const fetchCourseTopics = async (id: string[] | undefined) => {
        try {
            const result = await axios.get(
                `https://api.euron.one/api/v1/courses/${id}/content`
            );

            if (result?.data?.data) {
                const topicData = result.data.data;
                // console.log('topicdata-->', topicData[0].title)
                setTOPIC(topicData);
            } else {
                console.warn('No live courses data available from the API.');
                setTOPIC({});
            }

        } catch (error) {
            console.error('Error fetching topics:', error);
        }
    };

    const fetchDetails = async () => {
        try {
            const response = await axios.get(
                `https://api.euron.one/api/v1/courses/${slug}`
            );

            if (response?.data?.data) {
                const courseData = response.data.data;
                setDATA(courseData);
            } else {
                console.warn('No live courses data available from the API.');
                setDATA({});
            }

        } catch (error) {
            console.error('Error fetching live courses:', error);
        }
    };

    const slug = route.params.id;

    const [DATA, setDATA] = useState<CourseData>({});
    const [TOPIC, setTOPIC] = useState({});


    useEffect(() => {
        fetchDetails();
    }, [slug]);

    useEffect(() => {
        fetchCourseTopics(DATA.id);
    }, [DATA.id]);

    const webThumbnailUrl = DATA.mobileThumbnailUrl
        ? `https://euron.one/_next/image?url=${encodeURIComponent(
            `https://euron-prod-thumbnails.s3.ap-south-1.amazonaws.com/${DATA.mobileThumbnailUrl}`
        )}&w=750&q=75`
        : null;


    // console.log('object-->', webThumbnailUrl);
    // console.log('object-->', DATA.learningOutcomes)

    return (
        <SafeAreaView style={styles.container}>

            <Header user={user} />

            <ScrollView>

                <View style={styles.scrollcontainer}>

                    <View style={styles.imageContainer}>
                        {webThumbnailUrl ? (
                            <Image source={{ uri: webThumbnailUrl }} style={styles.thumbnail} />
                        ) : (
                            <Text style={{ color: 'red' }}>Image not available</Text>
                        )}
                    </View>

                    <Text style={styles.title}>{DATA.title ? (DATA.title) : (null)}</Text>
                </View>

                <View style={styles.contentcontainer}>

                    <Text style={styles.subTitle} numberOfLines={9}>{DATA.subTitle ? (DATA.subTitle) : (null)}</Text>
                    <Text style={styles.showmore}>Show More</Text>


                    <View style={styles.languagecontainer}>
                        <Image source={Images.globe} style={styles.globe} />
                        <Text style={styles.language}>{DATA.language ? (DATA.language) : (null)}</Text>
                    </View>


                    <View style={styles.languagecontainer}>
                        <Image source={Images.calendar} style={styles.globe} />
                        <Text style={styles.startson}>Starts On: {''}
                            <Text style={styles.december}>
                                {DATA.startDate ? (DATA.startDate) : (null)}
                            </Text>
                        </Text>
                    </View>


                    <View style={styles.languagecontainer}>
                        <Image source={Images.clock} style={styles.globe} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.startson}>Class Time: {''}</Text>
                            <Text style={styles.december}>
                                {DATA.classTiming ? (DATA.classTiming) : (null)}
                            </Text>
                        </View>
                    </View>


                    <View style={styles.planslive}>
                        <Text style={styles.thiscourse}>This course is included in plans <Text style={styles.live}>Live</Text></Text>

                        <TouchableOpacity style={styles.gotocoursebutton}>
                            <Text style={styles.gotocourse}>Go to Course</Text>
                        </TouchableOpacity>

                        <Text style={styles.or}>or</Text>

                        <Text style={styles.getaccess}>Get access to live class, self placed , projects , books and Euron Assist 24/7 for a year.</Text>

                        <TouchableOpacity style={styles.gotocoursebutton}>
                            <Text style={styles.gotocourse}>Euron Plus</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.planslive}>
                        <Text style={styles.whatyouwilllearn}>What you will learn</Text>
                        <View>
                            {DATA.learningOutcomes && DATA.learningOutcomes.map((item, index) => {
                                return (
                                    <View style={styles.bulletcont}>
                                        <Image source={Images.tick} style={styles.tick} />
                                        <Text style={styles.learnstyle}>{item}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>

                    <View style={styles.planslive}>
                        <Text style={styles.whatyouwilllearn}>This course includes:</Text>
                        <View>
                            {DATA.offerings && DATA.offerings.map((item, index) => {
                                return (
                                    <View style={styles.bulletcont}>
                                        <Image source={Images.movefwd} style={styles.movefwd} />
                                        <Text style={styles.courseincludesstyle}>{item?.text}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>



                    {/* COURSE CONTENT */}
                    <View style={styles.planslive}>
                        <Text style={styles.whatyouwilllearn}>Course Content</Text>
                        <View>
                            {TOPIC.length && TOPIC.map((item, index) => {
                                return (
                                    <View>
                                        <View style={styles.bulletcont}>
                                            <Text style={styles.coursecontenttitle}>{item.title}</Text>
                                            <Image source={Images.downarrow} style={styles.downarrow} />
                                        </View>
                                        <View style={styles.separatorcoursetitle} />
                                        {item.subtopics.map((sub) => {
                                            console.log('sub-->', sub.title);
                                            return (
                                                <View style={styles.subtitlecontainer}>
                                                    <Image source={Images.subtitletv} style={styles.subtitletv} />
                                                    <Text style={styles.subtitle}>
                                                        {sub.title}
                                                    </Text>
                                                </View>
                                            );
                                        })}
                                    </View>
                                );
                            })}
                        </View>
                    </View>



                    {/* prerequisites */}
                    <View>
                        {DATA.prerequisites?.map((prerequisite) => (
                            <View>
                                <Text style={{ color: 'white' }}>{prerequisite}</Text>
                            </View>
                        ))}
                    </View>


                    {/* Description */}
                    <View>
                        <Text style={{ color: 'white', marginTop:20 }}>{DATA.description}</Text>
                    </View>


                </View>

                <Footer />
            </ScrollView>

        </SafeAreaView >
    );
};

export default CourseDescriptionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#040E12',
    },
    thumbnail: {
        resizeMode: 'contain',
        height: '100%',
        width: '100%',
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: '#16B7CE',
        justifyContent: 'center',
        alignItems: 'center',
        height: moderateScale(200),
        width: moderateScale(350),
        borderRadius: 18,
        overflow: 'hidden',
        marginTop: moderateScale(15),
    },
    scrollcontainer: {
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontWeight: '800',
        fontSize: moderateScale(22),
        marginTop: moderateScale(17),
    },
    subTitle: {
        color: 'white',
        marginTop: moderateScale(17),
        fontWeight: '500',
        fontSize: moderateScale(16),
    },
    language: {
        color: 'white',
        textAlign: 'left',
        // marginTop: moderateScale(17),
        fontWeight: '500',
        fontSize: moderateScale(16),
    },
    contentcontainer: {
        marginHorizontal: moderateScale(25),
    },
    startson: {
        color: 'white',
        textAlign: 'left',
        // marginTop: moderateScale(17),
        fontWeight: '500',
        fontSize: moderateScale(16),
    },
    december: {
        color: '#66E8F9',
        fontSize: moderateScale(16),
        fontWeight: '800',
        width: 280,
        // marginTop: moderateScale(10)
    },
    globe: {
        height: moderateScale(18),
        width: moderateScale(18),
        marginRight: 8,
    },
    showmore: {
        color: '#23D3ED',
        textAlign: 'right',
        fontSize: moderateScale(16),
        fontWeight: '600',
        marginTop: moderateScale(10),
    },
    languagecontainer: {
        flexDirection: 'row',
        marginTop: moderateScale(7),
        alignItems: 'center',
    },
    planslive: {
        borderWidth: 5,
        borderColor: '#222A2C',
        padding: moderateScale(18),
        borderRadius: moderateScale(10),
        marginTop: moderateScale(20),
        backgroundColor: '#121717',
    },
    thiscourse: {
        color: '#159F48',
        marginBottom: moderateScale(17),
        fontSize: moderateScale(17),
        paddingHorizontal: moderateScale(8),
    },
    live: {
        color: 'red',
    },
    gotocourse: {
        color: '#fefefe',
        fontWeight: '800',
        fontSize: moderateScale(18),
    },
    gotocoursebutton: {
        backgroundColor: '#0A99AC',
        justifyContent: 'center',
        alignItems: 'center',
        padding: moderateScale(10),
        borderRadius: moderateScale(10),
    },
    or: {
        color: '#6A7280',
        textAlign: 'center',
        marginVertical: moderateScale(16),
        fontSize: moderateScale(14),
    },
    getaccess: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: moderateScale(15),
        marginBottom: moderateScale(20),
    },
    whatyouwilllearn: {
        color: 'white',
        fontWeight: '800',
        fontSize: moderateScale(22),
        marginBottom: moderateScale(16),
    },
    learnstyle: {
        color: '#ffffff',
        fontSize: moderateScale(16),
        width: '90%',
        marginTop: moderateScale(10),
    },
    courseincludesstyle: {
        color: '#78DFEF',
        fontSize: moderateScale(16),
        width: '90%',
        marginTop: moderateScale(6),
    },
    tick: {
        height: moderateScale(18),
        width: moderateScale(18),
        marginRight: moderateScale(14),
    },
    movefwd: {
        height: moderateScale(20),
        width: moderateScale(20),
        marginRight: moderateScale(14),
    },
    bulletcont: {
        flexDirection: 'row',
        flex: 1,
        padding: moderateScale(5),
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: moderateScale(10),

    },
    coursecontenttitle: {
        color: '#D9D9D9',
        fontSize: moderateScale(18),
        fontWeight: '700',
        flexWrap: 'wrap',
        width: '88%',

    },
    separatorcoursetitle: {
        borderWidth: 1,
        borderColor: '#222A2C',
        marginBottom: moderateScale(15),
        marginTop: moderateScale(10),
    },
    downarrow: {
        height: moderateScale(20),
        width: moderateScale(20),
        tintColor: '#78DFEF',
    },
    subtitle: {
        color: '#0A99AC',
        fontSize: moderateScale(16),
        // marginBottom: moderateScale(5),
        // marginTop: moderateScale(7),
    },
    subtitletv: {
        height: moderateScale(20),
        width: moderateScale(20),
        tintColor: 'white',
    },
    subtitlecontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: moderateScale(12),
        // borderWidth:1,
        // borderColor:'white',
        width: '90%',
        alignSelf: 'center'
    }
});
