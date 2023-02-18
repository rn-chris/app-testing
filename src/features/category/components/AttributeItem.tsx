import {HStack, Input} from 'native-base';
import React from 'react';
import {ActionIcon} from '../../../components';
import {useAppDispatch} from '../../../hooks';
import {updateCategory} from '../../../redux/categorySlice';
import {AttributeType, Category, Field} from '../../../types/models';

import {AttributePicker} from './AttributePicker';

interface Props {
  field: Field;
  category?: Category;
}
export function AttributeItem({field, category}: Props) {
  const dispatch = useAppDispatch();

  const handleAttributeChange = (attribute: AttributeType) => () => {
    if (!category) return;

    const fields = [...category.fields];

    dispatch(
      updateCategory({
        ...category,
        fields: fields.map(it =>
          it.id === field.id ? {...it, attributeType: attribute} : it,
        ),
      }),
    );
  };

  const handleDeleteField = () => {
    if (!category) return;

    const fields = category.fields.filter(it => it.id !== field.id);
    dispatch(
      updateCategory({
        ...category,
        fields,
        fieldIdMarkAsTitle:
          fields.length > 0 ? category.fieldIdMarkAsTitle : undefined,
      }),
    );
  };

  const handleChangeFieldLabel = (text: string) => {
    if (!category) return;

    const fields = [...category.fields];

    dispatch(
      updateCategory({
        ...category,
        fields: fields.map(it =>
          it.id === field.id ? {...it, label: text} : it,
        ),
      }),
    );
  };

  return (
    <HStack mt={2} space={4}>
      <Input
        onChangeText={handleChangeFieldLabel}
        value={field.label}
        flex={1}
        placeholder="Field"
      />
      <AttributePicker
        onChange={handleAttributeChange}
        label={field.attributeType.label}
      />

      <ActionIcon onPress={handleDeleteField} name="trash" />
    </HStack>
  );
}
