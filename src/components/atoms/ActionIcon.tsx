import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import {TouchableOpacity} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {IconProps} from 'react-native-vector-icons/Icon';

const BUTTON_PADDING = 6;
export function ActionIcon(props: IconProps & TouchableOpacityProps) {
  const iconSize = (props.size || 24) - BUTTON_PADDING;

  return (
    <TouchableOpacity
      style={{
        width: props.size,
        height: props.size,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FontAwesomeIcon {...props} size={iconSize} />
    </TouchableOpacity>
  );
}
