import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import axios from 'axios'
import { WebView } from 'react-native-webview';
import Header from '../components/HomeScreen/Header'
import auth from '@react-native-firebase/auth';
import Footer from '../components/HomeScreen/Footer'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Images } from '../assets'
import { vh } from '../constants/Dimensions'
import { navigationrRef } from '../utils/NavigationUtils'
import Lectures from '../components/InsideACourse/Lectures'


const DATA = [
    {
        id: 1,
        tab: 'Lectures'
    },
    {
        id: 2,
        tab: 'Overview'
    },
    {
        id: 3,
        tab: 'Q&A'
    },
    {
        id: 4,
        tab: 'Reviews'
    },
];

const user = auth().currentUser;

const InsideACourse = ({ route }) => {

    const { id } = route.params;
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [embedImg, setEmbedImg] = useState(null);
    const [selectedTab, setSelectedTab] = useState('Lectures')
    const [passedTitle, setPassedTitle] = useState(null)

    // console.log('mera-->', courseData.title)

    useEffect(() => {
        axios.get(`https://api.euron.one/api/v1/courses/course/${id}`)
            .then(response => {
                console.log('response==>', response.data.data)
                setPassedTitle(response.data.data.title)
                setCourseData(response.data.data);
                setLoading(false);
                setEmbedImg(response.data.data.previewUrl)
            })
            .catch(error => {
                console.error('Error fetching course data:', error);
                setLoading(false);
            })
    }, [id])

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0E99AD" />
            </View>
        )
    }
    // console.log('embedimg-->', embedImg)

    const handleTabChange = (tab) => {
        setSelectedTab(tab)
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#040E12" }}>
            <SafeAreaView>
                <View style={{ flex: 1 }}>
                    <Header user={user} />

                    <TouchableOpacity style={{ flexDirection: 'row', gap: 8, alignItems: 'center', marginLeft: 10, marginTop: 10, marginBottom: 10 }} onPress={() => navigationrRef.goBack()}>
                        <Image source={Images.backarrow} style={styles.backarrow} />
                        <Text style={styles.backtext}>Back</Text>
                    </TouchableOpacity>

                    {embedImg ? (
                        <WebView
                            source={{ uri: embedImg }}
                            style={styles.embedimg}
                            javaScriptEnabled={true}
                            allowsInlineMediaPlayback={true}
                            domStorageEnabled={true}
                        />
                    ) : (
                        <Text>no lecture</Text>
                    )}

                    <View style={{ backgroundColor: '#121717' }}>

                        <FlatList
                            data={DATA}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal
                            renderItem={({ item }) => {
                                // console.log("item-->", item)
                                return (
                                    <TouchableOpacity
                                        onPress={() => handleTabChange(item.tab)}
                                    >
                                        <Text style={[selectedTab === item.tab ? { color: '#0A99AC', fontSize: 21, fontWeight: '700' } : { color: 'white', fontSize: 21, fontWeight: '700' }]}>
                                            {item.tab}{"        "}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />

                        <View>
                            {selectedTab === 'Lectures' && (
                                <View>
                                    <Lectures passedTitle = {passedTitle}/>
                                </View>
                            )}
                            {selectedTab === 'Overview' && (
                                <View style={{ gap: 10, marginTop: vh(15) }}>
                                    <Text style={{ color: 'white', fontWeight: '700', fontSize: 22 }}>{courseData.categoryTitle}</Text>
                                    <Text style={{ color: '#999A9A', fontSize: 18, fontWeight: '500' }} numberOfLines={2}>{courseData.description}</Text>
                                    <Text style={{ color: '#0A99AC' }}>{courseData.instructorDetails[0].fullName}</Text>
                                    <Text style={{ color: 'white' }}>{courseData.instructorDetails[0].expertise}</Text>
                                    <Text style={{ color: 'white' }}>{courseData.instructorDetails[0].bio}</Text>
                                </View>
                            )}{selectedTab === 'Q&A' && (
                                <Text>yha pr q&a ka content aa jayega</Text>
                            )}{selectedTab === 'Reviews' && (
                                <Text>yha pr Reviews ka content aa jayega</Text>
                            )}
                        </View>
                    </View>


                </View>
            </SafeAreaView>

        </ScrollView>

    )
}

export default InsideACourse

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    embedimg: {
        marginBottom: 15,
        resizeMode: 'contain',
        height: 250,
        width: '100%'
    },
    backtext: {
        color: 'white',
        fontSize: 20
    },
    backarrow: {
        tintColor: 'white',
        height: vh(25),
        width: vh(25),
        resizeMode: 'contain',
    }
})