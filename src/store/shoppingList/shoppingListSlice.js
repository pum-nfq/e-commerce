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
    updateShoppingItem: (state, action) => {
      state.list[action.payload.index].total = action.payload.value;
    },
    deleteAllItem: (state) => {
      state.list = [];
    },
  },
});

export const {
  addShoppingItem,
  deleteShoppingItem,
  updateShoppingItem,
  deleteAllItem,
} = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
