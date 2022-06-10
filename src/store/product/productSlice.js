import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productAPI } from '../../api/productAPI';

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (newProduct) => {
    const response = await productAPI.create(newProduct);
    return response.data;
  }
);

const initialState = {
  product: [],
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(createProduct.rejected, (state) => {
      state.loading = 'failed';
    });
    builder.addCase(createProduct.pending, (state, { payload }) => {
      state.loading = 'succeeded';
      console.log(payload);
    });
  },
});

export default productSlice.reducer;
