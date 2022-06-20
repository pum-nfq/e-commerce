import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';

import sumUp from '../../utils/sumUp';

export const productList = (state) => state.product.list;
export const searchFilter = (state) => state.searchFilter.text;
export const shoppingList = (state) => {
  const copy = _.cloneDeep(state.shoppingList.list);
  return sumUp(copy);
};
export const remainingProductList = createSelector(
  productList,
  searchFilter,
  (list, search) => {
    return list.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  },
);
