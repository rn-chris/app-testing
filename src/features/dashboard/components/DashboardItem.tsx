import {Box, Text} from 'native-base';
import React from 'react';
import {FlatList} from 'react-native';
import {SectionHeader} from '../../../components/molecules/SectionHeader';
import {useAppSelector} from '../../../hooks';
import {useCardLayout} from '../../../hooks/dimension';
import {searchDataByCatId} from '../../../redux/categorySlice';
import {Category} from '../../../types/models';
import {DetailItem} from '../../detail/components/DetailItem';

interface Props {
  catId: string;
}
export const DashboardItem = ({catId}: Props) => {
  const {column} = useCardLayout();

  const data = useAppSelector(state => searchDataByCatId(state, catId));

  return (
    <Box>
      <SectionHeader catId={catId} />

      <FlatList
        ListEmptyComponent={
          <Text mt={4} alignSelf={'center'}>
            No items to display
          </Text>
        }
        showsVerticalScrollIndicator={false}
        numColumns={column}
        data={data}
        renderItem={data => (
          <DetailItem index={data.index} catId={catId} fieldValue={data.item} />
        )}
        keyExtractor={item => item.id}
      />
    </Box>
  );
};
