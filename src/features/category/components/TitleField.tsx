import {Box, Button, Menu, Text} from 'native-base';
import React, {useMemo} from 'react';
import {Dimensions} from 'react-native';
import {useAppDispatch} from '../../../hooks';
import {updateCategory} from '../../../redux/categorySlice';
import {Category} from '../../../types/models';

interface Props {
  category: Category;
}

const {width} = Dimensions.get('screen');
export function TitleField({category}: Props) {
  const dispatch = useAppDispatch();

  const selectedField = useMemo(() => {
    return category.fields.find(it => it.id === category.fieldIdMarkAsTitle);
  }, [category]);

  const handleChangeFieldTitle = (fieldId: string) => () => {
    dispatch(updateCategory({...category, fieldIdMarkAsTitle: fieldId}));
  };

  return (
    <Menu
      width={width / 2}
      trigger={triggerProps => {
        return (
          <Button mt={2} {...triggerProps}>
            <Text textTransform="uppercase" color={'white'} fontWeight="600">
              Title Field: {selectedField?.label || 'Unnamed Field'}
            </Text>
          </Button>
        );
      }}>
      {category.fields.map(it => (
        <Menu.Item onPress={handleChangeFieldTitle(it.id)} key={it.id}>
          {it.label}
        </Menu.Item>
      ))}
    </Menu>
  );
}
