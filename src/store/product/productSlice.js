import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { message } from 'antd';
import { productAPI } from '../../api/productAPI';
import Fuse from 'fuse.js';

export const getAllProduct = createAsyncThunk(
  'product/get-all-product',
  async () => {
    const response = await productAPI.getAll();
    return response.data;
  }
);

export const createProduct = createAsyncThunk(
  'product/create-product',
  async (newProduct, thunkAPI) => {
    const response = await productAPI.create(newProduct);
    thunkAPI.dispatch(getAllProduct());
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  'product/update-product',
  async (productToUpdate, thunkAPI) => {
    const response = await productAPI.update(productToUpdate);
    thunkAPI.dispatch(getAllProduct());
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'product/delete-product',
  async (idProductToDelete, thunkAPI) => {
    const response = await productAPI.delete(idProductToDelete);
    thunkAPI.dispatch(getAllProduct());
    return response.data;
  }
);

const initialState = {
  list: [],
  listSearch: [],
  loading: false,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    searchProduct: (state, { payload }) => {
      const options = {
        keys: ['name', 'brand', 'id'],
      };
      const fuse = new Fuse(current(state).list, options);
      const value = fuse.search(payload);
      const convertFuseToObj = value.map((item) => item.item);
      state.listSearch = convertFuseToObj;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProduct.rejected, (state) => {
      state.loading = false;
      message.error({
        content: 'Something went wrong!',
        key: 'create-product',
      });
    });
    builder.addCase(createProduct.fulfilled, (state, { payload }) => {
      state.loading = false;
      message.success({
        content: 'Add new product success!',
        key: 'create-product',
      });
    });

    builder.addCase(getAllProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProduct.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getAllProduct.fulfilled, (state, { payload }) => {
      state.loading = false;

      const result = Object.values(
        payload.reduce(
          (
            r,
            {
              brand,
              createdAt,
              image,
              detailImage,
              name,
              price,
              quantity,
              size,
              id,
            }
          ) => {
            if (!r[name])
              r[name] = { key: id, brand, image, detailImage, name, sizes: [] };
            r[name].sizes.push({ quantity, size, id, createdAt, price });
            return r;
          },
          {}
        )
      );

      state.list = result;
    });

    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.loading = false;
      message.error({
        content: 'Something went wrong!',
        key: 'update-product',
      });
    });
    builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
      state.loading = false;
      message.success({
        content: 'Update this product success!',
        key: 'update-product',
      });
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.loading = false;
      message.error({
        content: 'Something went wrong!',
        key: 'deleted-product',
      });
    });
    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      state.loading = false;
      message.success({
        content: 'Delete this product success!',
        key: 'deleted-product',
      });
    });
  },
});

export const { searchProduct } = productSlice.actions;
export default productSlice.reducer;
