import { createSelector } from '@reduxjs/toolkit';

export const productList = (state) => state.product.list;
export const searchFilter = (state) => state.searchFilter.text;
export const shoppingList = (state) => state.shoppingList.list;
export const remainingProductList = createSelector(
  productList,
  searchFilter,
  (list, search) => {
    return list.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  },
);
