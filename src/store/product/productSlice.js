import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { message } from 'antd';
import Fuse from 'fuse.js';

import { productAPI } from '../../api/productAPI';

export const getAllProduct = createAsyncThunk(
  'product/get-all-product',
  async () => {
    const response = await productAPI.getAll();
    return response.data;
  },
);

export const createProduct = createAsyncThunk(
  'product/create-product',
  async (newProduct, thunkAPI) => {
    const response = await productAPI.create(newProduct);
    thunkAPI.dispatch(getAllProduct());
    return response.data;
  },
);

export const updateProduct = createAsyncThunk(
  'product/update-product',
  async (productToUpdate, thunkAPI) => {
    const response = await productAPI.update(productToUpdate);
    thunkAPI.dispatch(getAllProduct());
    return response.data;
  },
);

export const deleteProduct = createAsyncThunk(
  'product/delete-product',
  async (idProductToDelete, thunkAPI) => {
    const response = await productAPI.delete(idProductToDelete);
    thunkAPI.dispatch(getAllProduct());
    return response.data;
  },
);

const initialState = {
  list: [],
  listSearch: [],
  listFilter: [],
  listSorter: [],
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
    filterProduct: (state, { payload }) => {
      state.loading = true;
      if (payload.length !== 0) {
        const filterBrands = current(state).list.filter((currentListItem) =>
          payload.includes(currentListItem.brand.toUpperCase()),
        );

        const filterSizes = current(state).list.filter(
          (currentListItem) =>
            currentListItem.sizes.findIndex(
              (sizeItem) =>
                // eslint-disable-next-line eqeqeq
                payload.findIndex(
                  // eslint-disable-next-line eqeqeq
                  (itemPayload) => itemPayload == sizeItem.size,
                ) !== -1,
            ) !== -1,
        );

        const filterPrices = current(state).list.filter((currentListItem) => {
          let filterPriceCheck = false;

          if (
            (payload.includes('UNDER $100') ||
              payload.includes('DƯỚI 2.323.000 ₫')) &&
            !filterPriceCheck
          ) {
            filterPriceCheck = currentListItem.sizes.some(
              (itemSize) => itemSize.price < 100,
            );
          }

          if (
            (payload.includes('$100 - $300') ||
              payload.includes('2.323.000 ₫ - 6.969.000 ₫')) &&
            !filterPriceCheck
          ) {
            filterPriceCheck = currentListItem.sizes.some(
              (itemSize) => itemSize.price >= 100 && itemSize.price <= 300,
            );
          }

          if (
            (payload.includes('$300 - $400') ||
              payload.includes('6.969.000 ₫ - 9.292.000 ₫')) &&
            !filterPriceCheck
          ) {
            filterPriceCheck = currentListItem.sizes.some(
              (itemSize) => itemSize.price >= 300 && itemSize.price <= 400,
            );
          }

          if (
            (payload.includes('OVER $400') ||
              payload.includes('TRÊN 9.292.000 ₫')) &&
            !filterPriceCheck
          ) {
            filterPriceCheck = currentListItem.sizes.some(
              (itemSize) => itemSize.price > 400,
            );
          }

          return filterPriceCheck;
        });

        state.listFilter = current(state).list.filter((currentListItem) => {
          if (
            filterBrands.length === 0 &&
            filterSizes.length === 0 &&
            filterPrices.length === 0
          ) {
            return false;
          }

          let filterListCheck = true;

          if (filterBrands.length !== 0 && filterListCheck) {
            filterListCheck =
              filterBrands.findIndex(
                (filterBrandItem) =>
                  filterBrandItem.name === currentListItem.name,
              ) !== -1;
          }

          if (filterSizes.length !== 0 && filterListCheck) {
            filterListCheck =
              filterSizes.findIndex(
                (filterSizeItem) =>
                  filterSizeItem.name === currentListItem.name,
              ) !== -1;
          }

          if (filterPrices.length !== 0 && filterListCheck) {
            filterListCheck =
              filterPrices.findIndex(
                (filterPriceItem) =>
                  filterPriceItem.name === currentListItem.name,
              ) !== -1;
          }

          return filterListCheck;
        });
      }
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setListSorter: (state, { payload }) => {
      state.listSorter = payload;
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
      state.list.unshift(payload);
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
            },
          ) => {
            if (!r[name])
              r[name] = {
                key: id,
                brand,
                image,
                detailImage,
                name,
                sizes: [],
              };
            r[name].sizes.push({
              quantity,
              size,
              id,
              createdAt,
              price,
            });
            return r;
          },
          {},
        ),
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
      const indexOfProduct = state.list.findIndex(
        (product) => product.id === payload.id,
      );
      state.list.splice(indexOfProduct, 1, payload);
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
      const indexOfProduct = state.list.findIndex(
        (product) => product.id === payload.id,
      );
      state.list.splice(indexOfProduct, 1);
      message.success({
        content: 'Delete this product success!',
        key: 'deleted-product',
      });
    });
  },
});

export const { searchProduct, filterProduct, setLoading, setListSorter } =
  productSlice.actions;
export default productSlice.reducer;
