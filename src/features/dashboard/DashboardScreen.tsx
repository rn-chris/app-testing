import {Box, Text} from 'native-base';
import React from 'react';
import {FlatList} from 'react-native';
import {useAppSelector} from '../../hooks';
import {selectCategoryList} from '../../redux/categorySlice';
import {NoCategory} from '../category/components/NoCategory';
import {DashboardItem} from './components/DashboardItem';

export function DashboardScreen() {
  const categories = useAppSelector(selectCategoryList);

  return (
    <Box flex={1} mx={4}>
      <FlatList
        contentContainerStyle={{flex: 1}}
        ListEmptyComponent={<NoCategory />}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <DashboardItem catId={item.id} />}
        keyExtractor={item => item.id}
        data={categories}
      />
    </Box>
  );
}
