import {Box, Text} from 'native-base';
import React from 'react';
import {FlatList} from 'react-native';
import {useAppSelector} from '../../hooks';
import {selectCategoryList} from '../../redux/categorySlice';
import {DashboardItem} from './components/DashboardItem';

export function DashboardScreen() {
  const categories = useAppSelector(selectCategoryList);

  return (
    <Box mx={4}>
      <FlatList
        ListEmptyComponent={
          <Text mt={4} alignSelf={'center'}>
            No items to display
          </Text>
        }
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <DashboardItem catId={item.id} />}
        keyExtractor={item => item.id}
        data={categories}
      />
    </Box>
  );
}
