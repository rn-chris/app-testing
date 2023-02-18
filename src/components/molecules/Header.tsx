import {useNavigation} from '@react-navigation/native';
import {Box, Divider, Heading, HStack, Pressable, useTheme} from 'native-base';
import React, {ReactElement, ReactNode} from 'react';
import {StatusBar, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActionIcon} from '../atoms';

export type ActionItem = {
  actionName?: 'down' | 'back' | 'close';
  render?: ReactElement;
  onPress?: () => void;
};
export type NHeaderProp = {
  type?: 'normal' | 'modal';
  transparent?: boolean;
  title?: ReactElement | string;
  left?: ActionItem | ActionItem[];
  right?: ActionItem | ActionItem[];
  style?: ViewStyle;
  children?: ReactNode;
};

export const Header = ({style, title, left, right, children}: NHeaderProp) => {
  const navigation = useNavigation();

  const {top} = useSafeAreaInsets();
  const theme = useTheme();

  const renderTitle = () => {
    if (typeof title === 'string') {
      return (
        <Heading size="sm" color={'black'} textAlign={'center'}>
          {title}
        </Heading>
      );
    }
    return title;
  };

  const renderSides = (actions: ActionItem | ActionItem[]) => {
    if (Array.isArray(actions)) {
      return (
        <React.Fragment>
          {actions.map((act, index) => {
            return (
              <React.Fragment key={index.toString()}>
                {renderSides(act)}
                {index < actions.length - 1 && (
                  <Divider orientation="vertical" />
                )}
              </React.Fragment>
            );
          })}
        </React.Fragment>
      );
    }

    const handlePress = () => {
      if (
        (actions.actionName === 'back' ||
          actions.actionName === 'close' ||
          actions.actionName === 'down') &&
        !actions.onPress
      ) {
        navigation.goBack();
      } else {
        actions.onPress && actions.onPress();
      }
    };

    return (
      <Pressable hitSlop={4} onPress={handlePress}>
        {actions.actionName === 'back' && (
          <ActionIcon size={24} name="chevron-left" />
        )}
        {actions.actionName === 'down' && (
          <ActionIcon size={24} name="chevron-down" />
        )}
        {actions.actionName === 'close' && (
          <ActionIcon size={24} name="xmark" />
        )}
        {actions.actionName === undefined && actions.render}
      </Pressable>
    );
  };

  return (
    <Box
      px={4}
      style={[{height: theme.sizes[10] + top, paddingTop: top}, style]}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={'transparent'}
      />
      {children || (
        <HStack flex={1} alignItems="center">
          <HStack flex={1} justifyContent="flex-start">
            {left && renderSides(left)}
          </HStack>
          <Box flex={0} justifyContent="center">
            {renderTitle()}
          </Box>
          <HStack flex={1} justifyContent="flex-end">
            {right && renderSides(right)}
          </HStack>
        </HStack>
      )}
    </Box>
  );
};
