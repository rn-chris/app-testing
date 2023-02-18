import {Box, Button, Heading, HStack, Input} from 'native-base';
import React from 'react';
import {useAppDispatch} from '../../../hooks';
import {GAP, useCardLayout} from '../../../hooks/dimension';
import {deleteCategory, updateCategory} from '../../../redux/categorySlice';
import {AttributeType, Category} from '../../../types/models';
import {generateUUID} from '../../../utils/utils';
import {AttributeItem} from './AttributeItem';
import {AttributePicker} from './AttributePicker';
import {TitleField} from './TitleField';

interface Props {
  item: Category;
  index: number;
}
export const CategoryItem = React.memo(({item, index}: Props) => {
  const dispatch = useAppDispatch();
  const {isTablet, cardWidth} = useCardLayout();

  const handleDeleteCategory = () => {
    dispatch(deleteCategory({id: item.id}));
  };

  const handleChangeCategoryName = (text: string) => {
    dispatch(updateCategory({...item, title: text}));
  };

  const handleAddField = (attributeType: AttributeType) => () => {
    const fields = [...item.fields];

    const newField = {id: generateUUID(), label: '', attributeType};
    const fieldIdMarkAsTitle =
      fields.length === 0 ? newField.id : item.fieldIdMarkAsTitle;
    fields.push(newField);

    dispatch(updateCategory({...item, fields: fields, fieldIdMarkAsTitle}));
  };

  return (
    <Box
      ml={!isTablet || index % 2 === 0 ? 0 : `${GAP / 2}px`}
      mr={!isTablet || index % 2 === 0 ? `${GAP / 2}px` : 0}
      width={cardWidth}
      borderRadius={'md'}
      mb={4}
      p={4}
      shadow={1}
      bgColor={'white'}>
      <Heading mb={3} fontSize={'md'}>
        {item.title}
      </Heading>

      <Input
        onChangeText={handleChangeCategoryName}
        value={item.title}
        placeholder="Category Name"
      />

      {item.fields.map(field => (
        <AttributeItem catId={item.id} key={field.id} field={field} />
      ))}

      <TitleField category={item} />

      <HStack space={2} mt={3}>
        <AttributePicker onChange={handleAddField} label="Add New Field" />

        <Button
          size="md"
          onPress={handleDeleteCategory}
          variant={'link'}
          _text={{color: 'appPrimary'}}>
          Remove
        </Button>
      </HStack>
    </Box>
  );
});
