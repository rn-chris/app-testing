import {
  createDrawerNavigator,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import React from 'react';
import {ManageCategoryScreen} from '../features/category/ManageCategoryScreen';
import {DashboardScreen} from '../features/dashboard/DashboardScreen';
import {DetailScreen} from '../features/detail/DetailScreen';
import {useAppSelector} from '../hooks';
import {selectCategoryList} from '../redux/categorySlice';

type AppParamList = {
  Dashboard: undefined;
  DetailScreen: undefined;
};

export type ScreenProps<T extends keyof AppParamList> = DrawerScreenProps<
  AppParamList,
  T
>;

const Drawer = createDrawerNavigator();

function RootNavigator() {
  const categories = useAppSelector(selectCategoryList);
  return (
    <Drawer.Navigator initialRouteName="Category">
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />

      {categories.map(category => (
        <Drawer.Screen
          key={category.id}
          options={{drawerLabel: category.title, headerTitle: category.title}}
          name={category.id}
          component={DetailScreen}
        />
      ))}

      <Drawer.Screen
        options={{
          drawerLabel: 'Manage Category',
          headerTitle: 'Manage Category',
        }}
        name="Category"
        component={ManageCategoryScreen}
      />
    </Drawer.Navigator>
  );
}

export default RootNavigator;
