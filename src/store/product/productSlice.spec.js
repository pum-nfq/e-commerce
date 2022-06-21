import { store } from '../store.js';
import {
  filterProduct,
  getAllProduct,
  searchProduct,
  setListSorter,
} from './productSlice';

describe('store/product', () => {
  it('should return the initial state', () => {
    const state = store.getState().product;
    expect(state).toEqual({
      list: [],
      listSearch: [],
      listFilter: [],
      listSorter: [],
      loading: false,
    });
  });

  it('should get all product', async () => {
    const result = await store.dispatch(getAllProduct());
    expect(result.type).toBe('product/get-all-product/fulfilled');

    const state = store.getState().product.list;
    expect(state.length).toBeGreaterThan(0);
  });

  it('should return value when search product', async () => {
    await store.dispatch(getAllProduct());
    store.dispatch(searchProduct('air jordan'));
    expect(store.getState().product.listSearch.length).toBeGreaterThan(0);
  });

  it('should return empty array when search product', async () => {
    await store.dispatch(getAllProduct());
    store.dispatch(searchProduct('#'));
    expect(store.getState().product.listSearch.length).toBe(0);
  });

  it('should return value when filter product', async () => {
    await store.dispatch(getAllProduct());
    store.dispatch(filterProduct(['Under $100']));
    expect(store.getState().product.listFilter.length).toBeGreaterThan(0);

    store.dispatch(filterProduct(['Dưới 2.323.000 ₫']));
    expect(store.getState().product.listFilter.length).toBeGreaterThan(0);
  });

  it('should return empty list filter when filter product', async () => {
    await store.dispatch(getAllProduct());
    store.dispatch(filterProduct(['#']));
    expect(store.getState().product.listFilter.length).toBe(0);
  });

  it('should loading is true when get all product', () => {
    store.dispatch(getAllProduct());
    expect(store.getState().product.loading).toBeTruthy();
  });

  it('should set list sorter is not empty', () => {
    store.dispatch(setListSorter(['Default']));
    expect(store.getState().product.listSorter).toEqual(['Default']);
  });
});
