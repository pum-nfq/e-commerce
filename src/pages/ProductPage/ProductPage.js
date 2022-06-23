import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '../../components/Filter/Filter';
import ProductList from '../../components/ProductList/ProductList';
import i18n from '../../i18n';
import {
  filterProduct,
  getAllProduct,
  setListSorter,
  setLoading,
} from '../../store/product/productSlice';
import './ProductPage.scss';

const FILTER_BRANDS = ['NIKE', 'AIR JORDAN', 'PUMA', 'ADIDAS', 'REEBOK', 'MLB'];
const PRODUCT_COVERS = {
  NIKE: 'http://snkrsg.com/thumbs/1110x425x1/upload/product/1-7641.jpg',
  'AIR JORDAN': 'http://snkrsg.com/thumbs/1110x425x1/upload/product/2-6253.jpg',
  PUMA: '',
  ADIDAS: 'http://snkrsg.com/thumbs/1110x425x1/upload/product/3-7511.jpg',
  REEBOK: '',
  MLB: '',
};

const ProductPage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.list);
  const productListFilter = useSelector((state) => state.product.listFilter);
  const productListSorter = useSelector((state) => state.product.listSorter);
  const [filters, setFilters] = useState([]);
  const [isSortRevert, setIsSortRevert] = useState(false);

  let displayData = [];
  if (productListSorter.length !== 0) {
    displayData = productListSorter;
  } else if (filters.length !== 0) {
    displayData = productListFilter;
  } else {
    displayData = productList;
  }

  useEffect(() => {
    if (productList.length === 0) dispatch(getAllProduct());
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilters([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  const handleFilter = (e) => {
    if (e.target.checked) {
      setFilters((prev) => {
        prev.push(e.target.value.toUpperCase());
        return prev;
      });
    } else {
      setFilters((prev) => {
        const index = prev.indexOf(e.target.value.toUpperCase());
        if (index !== -1) {
          prev.splice(index, 1);
        }
        return prev;
      });
    }
    dispatch(filterProduct(filters));
    dispatch(setListSorter([]));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 500);
  };

  const handleSort = (e) => {
    switch (e.target.innerText) {
      // handle sort by price
      case 'Sort by Price':
      case 'Sắp xếp theo giá':
        if (isSortRevert) {
          displayData = displayData.slice().sort((a, b) => {
            return a.sizes[0].price < b.sizes[0].price
              ? 1
              : a.sizes[0].price > b.sizes[0].price
              ? -1
              : 0;
          });
        } else {
          displayData = displayData.slice().sort((a, b) => {
            return a.sizes[0].price < b.sizes[0].price
              ? -1
              : a.sizes[0].price > b.sizes[0].price
              ? 1
              : 0;
          });
        }
        setIsSortRevert(!isSortRevert);
        dispatch(setListSorter(displayData));
        break;
      // handle sort by name
      case 'Sort by Name':
      case 'Sắp xếp theo tên':
        if (isSortRevert) {
          displayData = displayData.slice().sort((a, b) => {
            return a.name < b.name ? 1 : a.name > b.name ? -1 : 0;
          });
        } else {
          displayData = displayData.slice().sort((a, b) => {
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
          });
        }
        setIsSortRevert(!isSortRevert);
        dispatch(setListSorter(displayData));
        break;
      // handle sort by brand
      case 'Sort by Brand':
      case 'Sắp xếp theo thương hiệu':
        if (isSortRevert) {
          displayData = displayData.slice().sort((a, b) => {
            return a.brand < b.brand ? 1 : a.brand > b.brand ? -1 : 0;
          });
        } else {
          displayData = displayData.slice().sort((a, b) => {
            return a.brand < b.brand ? -1 : a.brand > b.brand ? 1 : 0;
          });
        }
        setIsSortRevert(!isSortRevert);
        dispatch(setListSorter(displayData));
        break;
      default:
        // default
        displayData = filters.length === 0 ? productList : productListFilter;
        dispatch(setListSorter([]));
    }
  };

  return (
    <>
      <div className="product-page-container">
        <div className="product-page-container__filter-container">
          <Filter onCheck={handleFilter} />
        </div>
        <div className="product-page-container__products-list-view-container">
          <ProductList
            title={
              filters.length === 1 && FILTER_BRANDS.includes(filters[0]) !== -1
                ? filters[0]
                : 'collection'
            }
            cover={
              PRODUCT_COVERS[
                filters.length === 1 &&
                FILTER_BRANDS.includes(filters[0]) !== -1
                  ? filters[0]
                  : 'collection'
              ]
            }
            sorter={handleSort}
            data={displayData}
          />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
