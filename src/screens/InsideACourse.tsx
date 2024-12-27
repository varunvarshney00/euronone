import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { Images } from '../assets';
import { navigationrRef } from '../utils/NavigationUtils';
import { moderateScale } from 'react-native-size-matters';
import Header from '../components/HomeScreen/Header';
import Lectures from '../components/InsideACourse/Lectures';
import Reviews from '../components/InsideACourse/Reviews';
import { RouteProp } from '@react-navigation/native';

const DATA = [
    { id: 1, tab: 'Lectures' },
    { id: 2, tab: 'Overview' },
    { id: 3, tab: 'Q&A' },
    { id: 4, tab: 'Reviews' },
];

type InsideACourseParams = {
    id: string;
};

type InstructorDetails = {
    fullName: string;
    expertise: string;
    bio: string;
};

type CourseData = {
    title: string;
    categoryTitle: string;
    description: string;
    previewUrl: string;
    instructorDetails: InstructorDetails[];
};

type InstructorProps = {
    profileUrl?: string;
}

type InsideACourseProps = {
    route: RouteProp<{ params: InsideACourseParams }, 'params'>;
};

const InsideACourse: React.FC<InsideACourseProps> = ({ route }) => {

    const { id } = route.params;
    const [courseData, setCourseData] = useState<CourseData | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState<string | null>('Lectures');
    const [instructorResponse, setInstructorResponse] = useState<InstructorProps[] | null>(null);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axios.get(`https://api.euron.one/api/v1/courses/course/${id}`);
                setCourseData(response.data.data);
            } catch (error) {
                console.error('Error fetching course data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourseData();
    }, [id]);

    useEffect(() => {
        const instructorDetails = async () => {
            try {
                const instructorResponseObject = await axios.get(`https://api.euron.one/api/v1/courses/${id}/instructors`);
                setInstructorResponse(instructorResponseObject.data.data);
            }
            catch (error) {
                console.log('Error fetching instructor details: ', error);
            }
        };
        instructorDetails();
    }, [id]);

    const profileImg = instructorResponse?.[0]?.profileUrl?.split('/').pop();

    const pImg = `https://euron.one/_next/image?url=https%3A%2F%2Feuron-prod-user-profile-pics.s3.ap-south-1.amazonaws.com%2Fprofile%2F${profileImg}&w=750&q=75`;


    console.log('web-->', pImg);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0E99AD" />
            </View>
        );
    }

    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

    const renderTabContent = () => {
        switch (selectedTab) {
            case 'Lectures':
                return <View> <Lectures passedTitle={courseData?.title || ''} /> </View>;
            case 'Overview':
                return (
                    <View style={styles.overviewContainer}>
                        <Text style={styles.overviewCategory}>{courseData?.categoryTitle}</Text>
                        <Text style={styles.overviewDescription} numberOfLines={2}>{courseData?.description}</Text>
                        <Text style={styles.readMore}>Read More</Text>
                        <Text style={styles.overviewInstructor}>{courseData?.instructorDetails[0].fullName}</Text>
                        <Text style={styles.overviewExpertise}>{courseData?.instructorDetails[0].expertise}</Text>
                        <Image source={{ uri: pImg }} style={styles.profileImage} />
                        <Text style={styles.overviewBio}>{courseData?.instructorDetails[0].bio}</Text>
                    </View>
                );
            case 'Q&A':
                return (
                    <Text style={styles.qaText}>Yha pr Q&A ka content aa jayega</Text>
                );
            case 'Reviews':
                return (
                    <Reviews />
                );
            default:
                null;
        }
    };

    return (
        <SafeAreaView style={styles.mainContainer}>

            <Header />

            <TouchableOpacity style={styles.backButton} onPress={() => navigationrRef.goBack()}>
                <Image source={Images.backarrow} style={styles.backarrow} />
                <Text style={styles.backtext}>Back</Text>
            </TouchableOpacity>

            <ScrollView style={styles.scrollView}>

                {/* VIDEO CONTAINER */}
                {courseData?.previewUrl ? (
                    <WebView
                        source={{ uri: courseData.previewUrl }}
                        style={styles.embedimg}
                        javaScriptEnabled
                        allowsInlineMediaPlayback
                        domStorageEnabled
                    />
                ) : (
                    <Text style={styles.noLectureText}>No lecture</Text>
                )}
                {/* VIDEO CONTAINER */}

                <View style={styles.tabContainer}>

                    {/* TABS FLATLIST */}
                    <FlatList
                        data={DATA}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleTabChange(item.tab)}
                            >
                                <Text style={[styles.tabText, selectedTab === item.tab && styles.selectedTabText]}>
                                    {item.tab}{'        '}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />

                    <View>{renderTabContent()}</View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default InsideACourse;

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    embedimg: {
        flex: 1,
        marginBottom: 15,
        resizeMode: 'contain',
        height: 250,
        width: '100%',
    },
    backtext: {
        color: 'white',
        fontSize: moderateScale(20),
    },
    backarrow: {
        tintColor: 'white',
        height: moderateScale(25),
        width: moderateScale(25),
        resizeMode: 'contain',
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#040E12',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#040E12',
    },
    backButton: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        marginLeft: moderateScale(10),
        marginTop: moderateScale(10),
        marginBottom: moderateScale(10),
    },
    noLectureText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        marginVertical: 10,
    },
    tabContainer: {
        backgroundColor: '#121717',
    },
    tabText: {
        color: 'white',
        fontSize: 21,
        fontWeight: '700',
    },
    selectedTabText: {
        color: '#0A99AC',
    },
    overviewContainer: {
        gap: 10,
        marginTop: moderateScale(15),
        padding: 20,
    },
    overviewCategory: {
        color: 'white',
        fontWeight: '700',
        fontSize: 24,
    },
    overviewDescription: {
        color: '#999A9A',
        fontSize: 20,
        fontWeight: '500',
        marginTop: moderateScale(12),

    },
    overviewInstructor: {
        color: '#0A99AC',
        fontSize: moderateScale(22),
        fontWeight: '700',
        borderBottomWidth: 2,
        borderColor: '#0A99AC',
        marginTop: moderateScale(14),
        marginBottom: moderateScale(7),
    },
    overviewExpertise: {
        color: '#6A6F73',
        fontSize: moderateScale(18),
    },
    overviewBio: {
        color: '#949595',
        fontSize:moderateScale(13.5),
    },
    qaText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 10,
    },
    readMore: {
        color: '#0A99AC',
        fontSize: moderateScale(20),
    },
    profileImage: {
        height: moderateScale(150),
        width: moderateScale(150),
        // resizeMode: 'contain',
        borderRadius: 1000,
        alignSelf: 'center',
        marginVertical:moderateScale(20),
    },
});
