import {DeleteIcon, Icon} from 'native-base';
import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import {TouchableOpacity} from 'react-native';

export function ActionIcon(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity {...props}>
      <DeleteIcon size={6} />
    </TouchableOpacity>
  );
}
