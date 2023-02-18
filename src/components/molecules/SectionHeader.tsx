import {Button, Heading, HStack} from 'native-base';
import React from 'react';
import {useAppDispatch} from '../../hooks';
import {updateCategory} from '../../redux/categorySlice';
import {Category, FieldValues} from '../../types/models';
import {generateUUID} from '../../utils/utils';

interface Props {
  category: Category;
}
export function SectionHeader({category}: Props) {
  const dispatch = useAppDispatch();

  const handleAddNewItem = () => {
    const data = [...category.data];
    const newItem: FieldValues = {
      id: generateUUID(),
      value: {},
    };
    data.push(newItem);

    dispatch(updateCategory({...category, data}));
  };

  return (
    <HStack my={4} alignItems={'center'} justifyContent={'space-between'}>
      <Heading>{category.title}</Heading>

      <Button onPress={handleAddNewItem}>Add New Item</Button>
    </HStack>
  );
}
