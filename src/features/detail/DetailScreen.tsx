import {useRoute} from '@react-navigation/native';
import {Box, KeyboardAvoidingView, Text} from 'native-base';
import React, {useMemo} from 'react';
import {FlatList} from 'react-native';
import {SectionHeader} from '../../components/molecules/SectionHeader';
import {useAppSelector} from '../../hooks';
import {useCardLayout} from '../../hooks/dimension';
import {selectCategoryList} from '../../redux/categorySlice';
import {Category} from '../../types/models';
import {DetailItem} from './components/DetailItem';

export function DetailScreen() {
  const categories = useAppSelector(selectCategoryList);
  const route = useRoute();
  const {column} = useCardLayout();

  const category = useMemo(() => {
    return categories.find(it => it.id === route.name) as Category;
  }, [categories, route]);

  return (
    <KeyboardAvoidingView flex={1} behavior="padding">
      <Box flex={1} px={4}>
        <SectionHeader category={category} />

        <FlatList
          numColumns={column}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <DetailItem index={index} category={category} fieldValue={item} />
          )}
          data={category.data}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text mt={4} alignSelf={'center'}>
              No items to display
            </Text>
          }
        />
      </Box>
    </KeyboardAvoidingView>
  );
}
