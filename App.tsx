import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider, Text} from 'native-base';
import React from 'react';
import {Provider} from 'react-redux';
import RootNavigator from './src/navigations';
import {persistor, store} from './src/redux/store';
import {theme} from './src/styles/theme';
import {PersistGate} from 'redux-persist/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Failed prop']);
export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <NavigationContainer>
          <NativeBaseProvider theme={theme}>
            <PersistGate
              loading={<Text>Loading...</Text>}
              persistor={persistor}>
              <RootNavigator />
            </PersistGate>
          </NativeBaseProvider>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}
