import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ATTRIBUTE_TYPES, Category, Field} from '../types/models';
import {generateUUID} from '../utils/utils';
import {RootState} from './store';

type InitialStateType = {
  categories: Category[];
};

const defaultCategory: Category = {
  id: generateUUID(),
  title: 'New Category',
  fields: [{id: generateUUID(), label: '', attributeType: ATTRIBUTE_TYPES[0]}],
  data: [],
};

const initialState: InitialStateType = {
  categories: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addNewCategory: state => {
      state.categories.push({
        ...defaultCategory,
        id: generateUUID(),
        fieldIdMarkAsTitle: defaultCategory.fields[0].id,
      });
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const payload = action.payload;
      state.categories = state.categories.map(category =>
        category.id === payload.id ? payload : category,
      );
    },
    deleteCategory: (state, action: PayloadAction<{id: string}>) => {
      state.categories = state.categories.filter(
        category => category.id !== action.payload.id,
      );
    },
  },
});

export const {addNewCategory, deleteCategory, updateCategory} =
  categorySlice.actions;

export const selectCategoryList = (state: RootState) => {
  return state.categoryReducer.categories;
};

export default categorySlice.reducer;
