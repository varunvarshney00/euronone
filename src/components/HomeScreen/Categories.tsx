import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { vh } from '../../constants/Dimensions';
import { vw } from '../../constants/Dimensions';
import { BASE_URL } from '@env';
import { ENDPOINTS } from '../../utils/Endpoints';


interface CategoryItem {
  id: string;
  title: string;
}

interface MyComponentProps {
  name: string;
}


const MyComponent: React.FC<MyComponentProps> = ({ name }) => {
  return (
    <View style={styles.elementcontainer}>
      <Text style={styles.element}>{name}</Text>
    </View>
  );
};

const renderItem = ({ item }: { item: CategoryItem }) => {
  return (
    <MyComponent name={item.title} />
  );
};

const Categories: React.FC = () => {
  const [DATA, setDATA] = useState<CategoryItem[]>([]);

  useEffect(() => {

    let dataToSend = {
      page: 1, limt: 20
    }
    axios
      .get(`${BASE_URL}${ENDPOINTS.Categories}?${dataToSend.limt}&${dataToSend.page}`)
      // .get('https://api.euron.one/api/v1/categories?page=1&limit=20')
      .then(response => {
        const apiData: CategoryItem[] = response.data.data;
        const allElement: CategoryItem = { id: '0', title: 'All' };
        setDATA([allElement, ...apiData]);
      })
      .catch(error => {
        console.log(error);
      });
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

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginTop: vh(23),
  },
  elementcontainer: {
    justifyContent: 'center',
    paddingHorizontal: vw(5),
    paddingVertical: vh(5),
    borderWidth: 1,
    borderColor: '#212121',
    borderRadius: 8,
  },
  element: {
    color: 'white',
    fontWeight: '700',
    fontSize: vw(13),
  },
  separator: {
    width: 13,
  },
});
