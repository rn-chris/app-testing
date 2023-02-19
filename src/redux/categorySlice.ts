import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  AttributeType,
  ATTRIBUTE_TYPES,
  Category,
  Field,
  FieldValues,
} from '../types/models';
import {generateUUID} from '../utils/utils';
import {RootState} from './store';

type InitialStateType = {
  categories: Category[];
  data: Record<string, FieldValues[]>;
};

const defaultCategory: Category = {
  id: generateUUID(),
  title: 'New Category',
  fields: [{id: generateUUID(), label: '', attributeType: ATTRIBUTE_TYPES[0]}],
};

const initialState: InitialStateType = {
  categories: [],
  data: {},
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addNewCategory: state => {
      const newCategory = {
        ...defaultCategory,
        id: generateUUID(),
        fieldIdMarkAsTitle: defaultCategory.fields[0].id,
      };
      state.categories.push(newCategory);
      state.data = {
        ...state.data,
        [newCategory.id]: [],
      };
    },

    updateCategory: (state, action: PayloadAction<Category>) => {
      const payload = action.payload;
      state.categories = state.categories.map(category =>
        category.id === payload.id ? payload : category,
      );
    },

    updateCategoryById: (
      state,
      action: PayloadAction<{catId: string; payload: Pick<Category, 'fields'>}>,
    ) => {
      const payload = action.payload;
      state.categories = state.categories.map(category =>
        category.id === payload.catId ? {...category, ...payload} : category,
      );
    },

    changeAttribute: (
      state,
      action: PayloadAction<{
        data: Field;
        catId: string;
      }>,
    ) => {
      const payload = action.payload;
      state.categories = state.categories.map(category =>
        category.id === payload.catId
          ? {
              ...category,
              fields: category.fields.map(it =>
                it.id === payload.data.id ? {...it, ...payload.data} : it,
              ),
            }
          : category,
      );
    },

    deleteAttribute: (
      state,
      action: PayloadAction<{
        catId: string;
        fieldId: string;
      }>,
    ) => {
      const payload = action.payload;
      state.categories = state.categories.map(cat => {
        if (cat.id === payload.catId) {
          return {
            ...cat,
            fields: cat.fields.filter(it => it.id !== payload.fieldId),
          };
        }
        return cat;
      });
    },

    deleteCategory: (state, action: PayloadAction<{id: string}>) => {
      state.categories = state.categories.filter(
        category => category.id !== action.payload.id,
      );

      delete state.data[action.payload.id];
    },

    addNewFieldData: (state, {payload}: PayloadAction<{catId: string}>) => {
      state.data[payload.catId]?.push({id: generateUUID(), value: {}});
    },

    updateFieldData: (
      state,
      action: PayloadAction<{
        categoryId: string;
        fieldId: string;
        value: Record<string, string>;
      }>,
    ) => {
      const {categoryId, fieldId, value} = action.payload;

      const data = state.data[categoryId].map(it => {
        if (it.id === fieldId) {
          const newItem = {...it.value, ...value};
          return {...it, value: newItem};
        }
        return it;
      });

      state.data = {...state.data, [categoryId]: data};
    },

    deleteFieldData: (
      state,
      action: PayloadAction<{
        categoryId: string;
        fieldId: string;
      }>,
    ) => {
      const {categoryId, fieldId} = action.payload;

      const data = state.data[categoryId].filter(it => it.id !== fieldId);

      state.data = {...state.data, [categoryId]: data};
    },
  },
});

export const {
  addNewCategory,
  deleteCategory,
  updateCategory,

  addNewFieldData,
  updateFieldData,
  deleteFieldData,

  deleteAttribute,
  changeAttribute,
} = categorySlice.actions;

export const selectCategoryList = (state: RootState) => {
  return state.categoryReducer.categories;
};

export const searchCategoryById = (state: RootState, id: string) => {
  return state.categoryReducer.categories.find(it => it.id === id);
};

export const searchAllData = (state: RootState) => {
  return state.categoryReducer.data;
};

export const searchDataByCatId = (state: RootState, id: string) => {
  return state.categoryReducer.data[id];
};

export default categorySlice.reducer;
