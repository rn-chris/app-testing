import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Button, Center, Text} from 'native-base';
import React from 'react';
import {useAppDispatch} from '../../../hooks';
import {AppParamList} from '../../../navigations';
import {addNewCategory} from '../../../redux/categorySlice';

export function NoCategory() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<AppParamList>>();

  const handleAddNewCategory = () => {
    dispatch(addNewCategory());
    navigation.navigate('Category');
  };

  return (
    <Center flex={1}>
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
