import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";
import searchReducer from "./searchFilter/searchFilterSlice";
import shoppingListReducer from "./shoppingList/shoppingListSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    searchFilter: searchReducer,
    shoppingList: shoppingListReducer,
  },
});
