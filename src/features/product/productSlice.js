import { createSlice } from '@reduxjs/toolkit';

const inititalState = {
  products: [],
  loading: false,
};

export const ProductSlice = createSlice({
  name: 'products',
  inititalState,
  reducers: {},
  extraReducers: {},
});

export default ProductSlice.reducer;
