import {useRoute} from '@react-navigation/native';
import {Box, KeyboardAvoidingView, Text} from 'native-base';
import React from 'react';
import {FlatList} from 'react-native';
import {SectionHeader} from '../../components/molecules/SectionHeader';
import {useAppSelector} from '../../hooks';
import {useCardLayout} from '../../hooks/dimension';
import {searchDataByCatId} from '../../redux/categorySlice';
import {DetailItem} from './components/DetailItem';

export function DetailScreen() {
  const route = useRoute();
  const data = useAppSelector(state => searchDataByCatId(state, route.name));
  const {column} = useCardLayout();

  return (
    <KeyboardAvoidingView flex={1} behavior="padding">
      <Box flex={1} px={4}>
        <SectionHeader catId={route.name} />

        <FlatList
          numColumns={column}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <DetailItem index={index} catId={route.name} fieldValue={item} />
          )}
          data={data}
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
