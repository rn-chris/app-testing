import React, {useCallback} from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {useCardLayout} from '../../../hooks/dimension';
import {Category} from '../../../types/models';
import {CategoryItem} from './CategoryItem';
import {NoCategory} from './NoCategory';

interface Props {
  categories: Category[];
}
export function CategoryList({categories}: Props) {
  const {column} = useCardLayout();

  const renderItem: ListRenderItem<Category> = ({item, index}) => {
    return <CategoryItem index={index} item={item} />;
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      numColumns={column}
      data={categories}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListEmptyComponent={<NoCategory />}
    />
  );
}
