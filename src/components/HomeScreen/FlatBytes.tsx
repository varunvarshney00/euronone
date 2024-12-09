import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { vh, vw } from '../../constants/Dimensions';

type ReelData = {
    id: string;
    thumbnailUrl: string;
};

type MyComponentProps = {
    thumbnailUrl: string;
};

const MyComponent: React.FC<MyComponentProps> = ({ thumbnailUrl }) => {
    return (
        <TouchableOpacity>
            <Image
                source={{ uri: thumbnailUrl }}
                style={styles.image}
            />
        </TouchableOpacity>
    );
};

export const fetchReelData = async (): Promise<ReelData[]> => {
    try {
        const response = await axios.get('https://api.euron.one/api/v1/reels?limit=10000');
        return response.data.data;
    }
    catch (error) {
        console.log('error==>', error);
        return [];
    }
}

const FlatBytes = () => {
    const [DATA, setDATA] = useState<ReelData[]>([]);

    const renderItem = ({ item }: { item: ReelData }) => {
        return (
            <MyComponent thumbnailUrl={item.thumbnailUrl} />
        );
    };


    useEffect(() => {
        const loadData = async () => {
            const apiData = await fetchReelData();
            setDATA(apiData);
        };
        loadData();
    }, []);



    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                horizontal
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

export default FlatBytes;

const styles = StyleSheet.create({
    container: {
        marginVertical: vh(10),
    },
    image: {
        // width: vw(100),
        // height: vh(600),
        width: Dimensions.get('screen').width / 1.6,
        height: Dimensions.get('screen').height / 1.5,
        // aspectRatio: 1,
        // resizeMode: 'contain',
    },
    separator: {
        width: vw(30),
    },
});
