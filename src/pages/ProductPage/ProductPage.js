import React, { useEffect } from "react";
import "./ProductPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../store/product/productSlice";

import ProductList from "../../components/ProductList/ProductList";
import Filter from "../../components/Filter/Filter";

const ProductPage = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.product.list);

    useEffect(() => {
        dispatch(getAllProduct());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="product-page-container">
            <div className="product-page-container__filter-container">
                <Filter />
            </div>
            <div className="product-page-container__products-list-view-container">
                <ProductList title="collection" data={productList} />
            </div>
        </div>
    );
};

export default ProductPage;
