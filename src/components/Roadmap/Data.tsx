import { ActivityIndicator, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { vh, vw } from '../../constants/Dimensions';
import { WebView } from 'react-native-webview';

const Data = ({ searchQuery }) => {
    const [roadmaps, setRoadmaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredRoadmaps, setFilteredRoadmaps] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [videoUrl, setVideoUrl] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => {
        const fetchRoadmaps = async () => {
            try {
                const response = await axios.get("https://api.euron.one/api/v1/roadmaps");
                if (response.data.success) {
                    const updatedData = response.data.data.map((item) => {
                        const filename = item.thumbnail.split("/").pop();
                        return {
                            ...item,
                            thumbnail: `https://euron.one/_next/image?url=https%3A%2F%2Feuron-prod-thumbnails.s3.ap-south-1.amazonaws.com%2Froadmap%2F${filename}&w=750&q=75`,
                        };
                    });
                    setRoadmaps(updatedData);
                    setFilteredRoadmaps(updatedData);
                }
            } catch (error) {
                console.error("Error fetching roadmaps:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRoadmaps();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filtered = roadmaps.filter((roadmap) =>
                roadmap.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredRoadmaps(filtered);
        } else {
            setFilteredRoadmaps(roadmaps); // Reset if no search query
        }
    }, [searchQuery, roadmaps]);

    const openModal = (url, title) => {
        setVideoUrl(url);
        setTitle(title)
        setModalVisible(true);
    };


    const renderCard = ({ item }) => (
        // console.log('videourl-->',item.title),

        <View style={styles.card}>
            <TouchableOpacity onPress={() => openModal(item.link, item.title)}>
                <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
                <View style={styles.playIconContainer}>
                    <Text style={styles.playIcon}>▶</Text>
                </View>
            </TouchableOpacity>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.roadmaptext}>Roadmaps curated for you</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : filteredRoadmaps.length > 0 ? (
                <FlatList
                    data={filteredRoadmaps}
                    renderItem={renderCard}
                    keyExtractor={(item) => item.id.toString()}
                    scrollEnabled={false}
                />
            ) : (
                <Text style={styles.comingSoonText}>Coming Soon...</Text>

            )}

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginHorizontal: 8, alignItems: 'center' }}>

                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, textAlign: 'left', paddingHorizontal: 18,}} numberOfLines={2}>{title}</Text>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalContent}>
                        <WebView
                            source={{ uri: videoUrl }}
                            style={styles.webView}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};


export default Data

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121717",
        padding: 10,
        marginTop: 10,
        borderRadius: 10
    },
    card: {
        backgroundColor: "#121717",
        borderWidth: 4,
        borderColor: '#1F2728',
        borderRadius: 17,
        marginVertical: 13,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginHorizontal: vw(40),
        overflow: 'hidden'
    },
    thumbnail: {
        width: "100%",
        height: 150,
        borderRadius: 8,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        marginBottom: 8,
        paddingHorizontal: 17,
        marginTop: 8
    },
    description: {
        fontSize: 14,
        color: "#666",
        paddingHorizontal: 17,
        marginBottom: vh(19),
        flexShrink: 1,
    },
    roadmaptext: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: vh(29),
        marginBottom: vh(10)
    },
    comingSoonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 150,
    },
    playIconContainer: {
        position: 'absolute',
        top: '30%',
        left: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 100,
        width: 50,
        height: 50,
    },
    playIcon: {
        color: 'black',
        fontSize: 30,
        borderRadius: 10
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    modalContent: {
        // width: vw(400),
        // height: vh(185),
        // overflow: 'hidden',
        // resizeMode: 'contain',
        borderTopWidth: 2,
        borderColor: 'white',
        // height:40, 
        // width:40
        width: '100%',
        maxWidth: 800,
        height: '30%',
        // borderRadius: 10,
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    closeButton: {
        backgroundColor: '#E4E7EB',
        zIndex: 999,
        borderRadius: 100,
        width: 34,
        height: 34,
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeButtonText: {
        fontSize: 15,
        color: 'black',
    },
    webView: {
        flex: 1,
        height: '100%',
        width: '100%'
    },
})
