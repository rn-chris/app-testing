import {HStack, Input} from 'native-base';
import React from 'react';
import {ActionIcon} from '../../../components';
import {useAppDispatch} from '../../../hooks';
import {changeAttribute, deleteAttribute} from '../../../redux/categorySlice';
import {AttributeType, Field} from '../../../types/models';

import {AttributePicker} from './AttributePicker';

interface Props {
  field: Field;
  catId: string;
}
export const AttributeItem = React.memo(({field, catId}: Props) => {
  const dispatch = useAppDispatch();

  const handleAttributeChange = (attribute: AttributeType) => () => {
    dispatch(
      changeAttribute({
        catId,
        data: {
          ...field,
          attributeType: attribute,
        },
      }),
    );
  };

  const handleDeleteField = () => {
    dispatch(
      deleteAttribute({
        catId,
        fieldId: field.id,
      }),
    );
  };

  const handleChangeFieldLabel = (text: string) => {
    dispatch(
      changeAttribute({
        catId,
        data: {
          ...field,
          label: text,
        },
      }),
    );
  };

  return (
    <HStack alignItems={'center'} mt={2} space={3}>
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

      <ActionIcon size={28} onPress={handleDeleteField} name="trash" />
    </HStack>
  );
});
