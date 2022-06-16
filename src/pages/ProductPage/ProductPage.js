import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '../../components/Filter/Filter';
import ProductList from '../../components/ProductList/ProductList';
import {
    filterProduct,
    getAllProduct,
    setListSorter,
    setLoading,
} from '../../store/product/productSlice';
import './ProductPage.scss';

const ProductPage = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.product.list);
    const productListFilter = useSelector((state) => state.product.listFilter);
    const productListSorter = useSelector((state) => state.product.listSorter);
    const loading = useSelector((state) => state.product.loading);
    const [filters, setFilters] = useState([]);
    const [isSortRevert, setIsSortRevert] = useState(false);
    let displayData = filters.length === 0 ? productList : productListFilter;
    displayData = !!productListSorter.length ? productListSorter : displayData;

    useEffect(() => {
        dispatch(getAllProduct());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 500);
    };

    // console.log(productList);
    // console.log(productListFilter);

    const handleSort = (e) => {
        switch (e.target.innerText) {
            // handle sort by price
            case 'Sort by Price':
                if (isSortRevert) {
                    displayData = displayData.slice().sort((a, b) => {
                        return a.price < b.price
                            ? 1
                            : a.price > b.price
                            ? -1
                            : 0;
                    });
                } else {
                    displayData = displayData.slice().sort((a, b) => {
                        return a.price < b.price
                            ? -1
                            : a.price > b.price
                            ? 1
                            : 0;
                    });
                }
                setIsSortRevert(!isSortRevert);
                dispatch(setListSorter(displayData));
                break;
            // handle sort by name
            case 'Sort by Name':
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
                if (isSortRevert) {
                    displayData = displayData.slice().sort((a, b) => {
                        return a.brand < b.brand
                            ? 1
                            : a.brand > b.brand
                            ? -1
                            : 0;
                    });
                } else {
                    displayData = displayData.slice().sort((a, b) => {
                        return a.brand < b.brand
                            ? -1
                            : a.brand > b.brand
                            ? 1
                            : 0;
                    });
                }
                setIsSortRevert(!isSortRevert);
                dispatch(setListSorter(displayData));
                break;
            default:
                // default
                displayData =
                    filters.length === 0 ? productList : productListFilter;
                dispatch(setListSorter([]));
        }
    };

    // console.log(displayData);

    return (
        <>
            <Spin spinning={loading}>
                <div className="product-page-container">
                    <div className="product-page-container__filter-container">
                        <Filter onCheck={handleFilter} />
                    </div>
                    <div className="product-page-container__products-list-view-container">
                        <ProductList
                            title="collection"
                            sorter={handleSort}
                            data={displayData}
                        />
                    </div>
                </div>
            </Spin>
        </>
    );
};

export default ProductPage;
