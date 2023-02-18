import {Button, Heading, HStack} from 'native-base';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  addNewFieldData,
  searchCategoryById,
  updateCategory,
} from '../../redux/categorySlice';
import {Category, FieldValues} from '../../types/models';
import {generateUUID} from '../../utils/utils';

interface Props {
  catId: string;
}
export const SectionHeader = React.memo(({catId}: Props) => {
  const category = useAppSelector(state => searchCategoryById(state, catId));

  const dispatch = useAppDispatch();

  const handleAddNewItem = () => {
    dispatch(addNewFieldData({catId}));
  };

  return (
    <HStack my={4} alignItems={'center'} justifyContent={'space-between'}>
      <Heading>{category?.title}</Heading>

      <Button onPress={handleAddNewItem}>Add New Item</Button>
    </HStack>
  );
});
