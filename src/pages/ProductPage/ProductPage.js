import React, { useEffect, useState } from "react";
import "./ProductPage.scss";
import { useDispatch, useSelector } from "react-redux";

import { getAllProduct, filterProduct } from "../../store/product/productSlice";
import ProductList from "../../components/ProductList/ProductList";
import Filter from "../../components/Filter/Filter";

const ProductPage = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.product.list);
    const productListFilter = useSelector((state) => state.product.listFilter);
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        dispatch(getAllProduct());
    }, []);

    const handleFilter = (e) => {
        if (e.target.checked) {
            setFilters((prev) => {
                prev.push(e.target.value.toUpperCase());
                return prev;
            });
        } else {
            setFilters((prev) => {
                prev.pop(e.target.value.toUpperCase());
                return prev;
            });
        }
        dispatch(filterProduct(filters));
    };

    console.log(productList);
    console.log(productListFilter);

    return (
        <>
            <div className="product-page-container">
                <div className="product-page-container__filter-container">
                    <Filter onCheck={handleFilter} />
                </div>
                <div className="product-page-container__products-list-view-container">
                    <ProductList
                        title="collection"
                        data={
                            filters.length === 0
                                ? productList
                                : productListFilter
                        }
                    />
                </div>
            </div>
            {console.log("productpage render")}
        </>
    );
};

export default ProductPage;
