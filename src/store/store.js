import { configureStore } from '@reduxjs/toolkit';
import productReducer from './product/productSlice';
export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
