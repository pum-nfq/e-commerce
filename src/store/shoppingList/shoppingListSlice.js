import { createSlice } from '@reduxjs/toolkit';

const cacheList = JSON.parse(localStorage.getItem('shoppingList')) || [];
const initialState = { list: cacheList };
const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    updateShoppingList: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { updateShoppingList } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
