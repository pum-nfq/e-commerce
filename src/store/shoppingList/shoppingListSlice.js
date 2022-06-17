import { createSlice } from '@reduxjs/toolkit';

const cacheList = JSON.parse(localStorage.getItem('shoppingList')) || [];
const initialState = { list: cacheList };
const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    addShoppingItem: (state, action) => {
      state.list.push(action.payload);
    },
    deleteShoppingItem: (state, action) => {
      state.list.splice(action.payload, 1);
    },
  },
});

export const { addShoppingItem, deleteShoppingItem } =
  shoppingListSlice.actions;
export default shoppingListSlice.reducer;
