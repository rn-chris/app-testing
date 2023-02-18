import {Button, Menu} from 'native-base';
import React from 'react';
import {AttributeType, ATTRIBUTE_TYPES} from '../../../types/models';

interface Props {
  label?: string;
  onChange: (attributeType: AttributeType) => () => void;
}
export function AttributePicker({label, onChange}: Props) {
  return (
    <Menu
      w="150"
      trigger={triggerProps => {
        return (
          <Button
            variant={'outline'}
            _text={{textTransform: 'uppercase', color: 'appPrimary'}}
            size="md"
            {...triggerProps}>
            {label || 'Select'}
          </Button>
        );
      }}>
      {ATTRIBUTE_TYPES.map(it => (
        <Menu.Item key={it.type} onPress={onChange(it)}>
          {it.label}
        </Menu.Item>
      ))}
    </Menu>
  );
}
