import {Box, Button, Center, Text} from 'native-base';
import React from 'react';
import {useAppDispatch} from '../../../hooks';
import {addNewCategory} from '../../../redux/categorySlice';

export function NoCategory() {
  const dispatch = useAppDispatch();

  const handleAddNewCategory = () => {
    dispatch(addNewCategory());
  };

  return (
    <Center>
      <Text>No category found</Text>

      <Button
        onPress={handleAddNewCategory}
        textTransform={'uppercase'}
        mt={3}
        _text={{color: 'white'}}>
        Add a category
      </Button>
    </Center>
  );
}
