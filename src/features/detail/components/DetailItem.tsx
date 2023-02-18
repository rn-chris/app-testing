import dayjs from 'dayjs';
import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Pressable,
  Switch,
  Text,
  VStack,
} from 'native-base';
import React, {useMemo, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {DATE_FORMAT} from '../../../consts/Constants';

import {useAppDispatch} from '../../../hooks';
import {GAP, useCardLayout} from '../../../hooks/dimension';
import {updateCategory} from '../../../redux/categorySlice';
import {Category, Field, FieldValues} from '../../../types/models';

interface Props {
  fieldValue: FieldValues;
  category: Category;
  index: number;
}

export const DetailItem = React.memo(({fieldValue, category, index}: Props) => {
  console.log('DetailItem', index);
  const {cardWidth, isTablet} = useCardLayout(16);

  const dispatch = useAppDispatch();
  const [fieldIdSelectedByPicker, setOpenDatePicker] = useState<string>();
  const {fieldIdMarkAsTitle = '', fields} = useMemo(() => category, [category]);

  const handleOpenDatePicker = (fieldId: string) => () => {
    setOpenDatePicker(fieldId);
  };

  const handleRemoveDetail = () => {
    const data = category.data.filter(it => it.id !== fieldValue.id);
    dispatch(updateCategory({...category, data}));
  };

  const update = (fieldId: string, value: string) => {
    const data = category.data.map(it => {
      if (it.id === fieldValue.id) {
        return {...it, value: {...it.value, [fieldId]: value}};
      }
      return it;
    });
    dispatch(updateCategory({...category, data}));
  };

  const renderValueByType = (field: Field) => {
    const {type} = field.attributeType;
    const value = fieldValue.value[field.id];
    if (type === 'text' || type === 'number') {
      return (
        <>
          <Text>{field.label}</Text>
          <Input
            keyboardType={type === 'number' ? 'numeric' : 'default'}
            value={value}
            onChangeText={text => {
              update(field.id, text);
            }}
          />
        </>
      );
    }

    if (type === 'checkbox') {
      return (
        <HStack space={2} alignItems={'center'}>
          <Switch
            isChecked={value === 'true'}
            onToggle={value => {
              update(field.id, value.toString());
            }}
          />
          <Text>{field.label}</Text>
        </HStack>
      );
    }

    if (type === 'date') {
      return (
        <Box>
          <Text>{field.label}</Text>
          <Pressable
            pointerEvents="box-only"
            onPress={handleOpenDatePicker(field.id)}>
            <Input value={value} isReadOnly />
          </Pressable>
        </Box>
      );
    }
  };

  return (
    <Box
      ml={!isTablet || index % 2 === 0 ? 0 : `${GAP / 2}px`}
      mr={!isTablet || index % 2 === 0 ? `${GAP / 2}px` : 0}
      width={cardWidth}
      bgColor={'white'}
      mb={4}
      p={4}>
      <Heading mb={3} fontSize={'md'}>
        {fieldValue.value[fieldIdMarkAsTitle] || 'Unnamed Field'}
      </Heading>

      <VStack space={3}>
        {fields.map(field => {
          return <Box key={field.id}>{renderValueByType(field)}</Box>;
        })}
      </VStack>

      <Button
        onPress={handleRemoveDetail}
        _text={{color: 'appPrimary'}}
        mt={3}
        variant="link">
        Remove
      </Button>

      <DatePicker
        modal
        mode="date"
        date={new Date()}
        open={Boolean(fieldIdSelectedByPicker)}
        onConfirm={date => {
          update(
            fieldIdSelectedByPicker as string,
            dayjs(date).format(DATE_FORMAT),
          );
          setOpenDatePicker(undefined);
        }}
        onCancel={() => {
          setOpenDatePicker(undefined);
        }}
      />
    </Box>
  );
});
