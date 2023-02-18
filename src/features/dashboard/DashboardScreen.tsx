import {Box, Text} from 'native-base';
import React from 'react';
import {FlatList} from 'react-native';
import {SectionHeader} from '../../components/molecules/SectionHeader';
import {useAppSelector} from '../../hooks';
import {useCardLayout} from '../../hooks/dimension';
import {selectCategoryList} from '../../redux/categorySlice';
import {DetailItem} from '../detail/components/DetailItem';

export function DashboardScreen() {
  const categories = useAppSelector(selectCategoryList);
  const {column} = useCardLayout();

  return (
    <Box mx={4}>
      <FlatList
        ListEmptyComponent={
          <Text mt={4} alignSelf={'center'}>
            No items to display
          </Text>
        }
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <Box>
            <SectionHeader category={item} />

            <FlatList
              ListEmptyComponent={
                <Text mt={4} alignSelf={'center'}>
                  No items to display
                </Text>
              }
              showsVerticalScrollIndicator={false}
              numColumns={column}
              data={item.data}
              renderItem={data => (
                <DetailItem
                  index={data.index}
                  category={item}
                  fieldValue={data.item}
                />
              )}
              keyExtractor={item => item.id}
            />
          </Box>
        )}
        keyExtractor={item => item.id}
        data={categories}
      />
    </Box>
  );
}
