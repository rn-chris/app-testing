import {Box, Button, KeyboardAvoidingView} from 'native-base';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {addNewCategory, selectCategoryList} from '../../redux/categorySlice';
import {CategoryList} from './components/CategoryList';

export function ManageCategoryScreen() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategoryList);
  const {bottom} = useSafeAreaInsets();

  const handleAddNewCategory = () => {
    dispatch(addNewCategory());
  };

  return (
    <Box flex={1} pt={4} px={4}>
      <KeyboardAvoidingView flex={1} behavior="padding">
        <CategoryList categories={categories} />
        {categories.length > 0 && (
          <Button
            mb={`${Math.max(bottom, 16)}px`}
            onPress={handleAddNewCategory}>
            Add New Category
          </Button>
        )}
      </KeyboardAvoidingView>
    </Box>
  );
}
