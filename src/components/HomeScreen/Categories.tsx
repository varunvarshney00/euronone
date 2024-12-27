// DONE

// THIS COMPONENT WILL FETCH ALL THE CATEGORY NAMES ON THE HOME SCREEN

import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '@env';
import { ENDPOINTS } from '../../utils/Endpoints';
import { moderateScale } from 'react-native-size-matters';

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

const itemSeparator = () => (
  <View style={styles.separator} />
);

const Categories: React.FC = () => {
  const [DATA, setDATA] = useState<CategoryItem[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}${ENDPOINTS.Categories}?limit=20&page=1`
        );
        const apiData: CategoryItem[] = response.data.data;
        const allElement: CategoryItem = { id: '0', title: 'All' };
        setDATA([allElement, ...apiData]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        ItemSeparatorComponent={itemSeparator}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(23),
  },
  elementcontainer: {
    justifyContent: 'center',
    paddingHorizontal: moderateScale(5),
    paddingVertical: moderateScale(5),
    borderWidth: 1,
    borderColor: '#212121',
    borderRadius: moderateScale(8),
  },
  element: {
    color: 'white',
    fontWeight: '700',
    fontSize: moderateScale(13),
  },
  separator: {
    width: moderateScale(13),
  },
});
