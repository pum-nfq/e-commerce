import React, { useEffect } from "react";
import "./ProductPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../store/product/productSlice";

import ProductList from "../../components/ProductList/ProductList";
import Filter from "../../components/Filter/Filter";

const data = [
    {
        ProductCreatedAt: "2022-06-08T10:55:42.201Z",
        productImage:
            "http://snkrsg.com/thumbs/830x550x1/upload/product/18-5098.jpg",
        productBrand: "Nike",
        productPrice: 1950000,
        productName: "COURT VISION ALTA TXT LIGHT SOFT PINK MAGIC EMBER",
        productSize: ["36.5", "37.0", "37.5", "38.0", "38.5", "39.0", "39.5"],
        ProductId: "1",
    },
    {
        ProductCreatedAt: "2022-06-08T10:55:42.201Z",
        productImage:
            "http://snkrsg.com/thumbs/830x550x1/upload/product/25-5397.jpg",
        productBrand: "Nike",
        productPrice: 2790000,
        productName: "COURT VISION ATLA ALL WHITE W",
        productSize: ["36.0", "37.0", "37.5", "38.0", "38.5"],
        ProductId: "2",
    },
    {
        ProductCreatedAt: "2022-06-08T10:55:42.201Z",
        productImage:
            "http://snkrsg.com/thumbs/830x550x1/upload/product/13-2279.jpg",
        productBrand: "Nike",
        productPrice: 1800000,
        productName: "COURT LEGACY WHITE SUNSET PULSE",
        productSize: ["36.0", "38.5", "40.0"],
        ProductId: "3",
    },
    {
        ProductCreatedAt: "2022-06-08T10:55:42.201Z",
        productImage:
            "http://snkrsg.com/thumbs/830x550x1/upload/product/24-4516.jpg",
        productBrand: "Nike",
        productPrice: 2100000,
        productName: "COURT LEGACY WHITE DESERT OCHRE",
        productSize: ["44.0"],
        ProductId: "4",
    },
    {
        ProductCreatedAt: "2022-06-08T10:55:42.201Z",
        productImage:
            "http://snkrsg.com/thumbs/830x550x1/upload/product/22-4724.jpg",
        productBrand: "Nike",
        productPrice: 1900000,
        productName: "COURT VISION LOW LEOPARD SWOOSH",
        productSize: ["36.5"],
        ProductId: "5",
    },
    {
        ProductCreatedAt: "2022-06-08T10:55:42.201Z",
        productImage:
            "http://snkrsg.com/thumbs/830x550x1/upload/product/5-2145.jpg",
        productBrand: "Nike",
        productPrice: 3500000,
        productName: "AIR FORCE 1 LOW WHITE SILVER",
        productSize: ["40.0", "40.5", "41.0", "42.0", "43.0", "44.5"],
        ProductId: "6",
    },
    {
        ProductCreatedAt: "2022-06-08T10:55:42.201Z",
        productImage:
            "http://snkrsg.com/thumbs/830x550x1/upload/product/7-5603.jpg",
        productBrand: "Nike",
        productPrice: null,
        productName: "RUNNING REACT ELEMENT 87",
        productSize: ["38.5"],
        ProductId: "7",
    },
    {
        ProductCreatedAt: "2022-06-08T10:55:42.201Z",
        productImage:
            "http://snkrsg.com/thumbs/830x550x1/upload/product/2-4945.jpg",
        productBrand: "Nike",
        productPrice: 1800000,
        productName: "CORTEZ BASIC GS",
        productSize: ["37.0", "37.5"],
        ProductId: "8",
    },
    {
        ProductCreatedAt: "2022-06-08T10:55:42.201Z",
        productImage:
            "http://snkrsg.com/thumbs/830x550x1/upload/product/13-4256.jpg",
        productBrand: "Nike",
        productPrice: null,
        productName: "ODYSSEY REACT 2 FLYKNIT HYDROGEN BLUE BLACK SAPPHIRE",
        productSize: ["42.0"],
        ProductId: "9",
    },
    {
        ProductCreatedAt: "2022-06-08T10:55:42.201Z",
        productImage:
            " http://snkrsg.com/thumbs/830x550x1/upload/product/14-9333.jpg",
        productBrand: "Nike",
        productPrice: null,
        productName: "ROSHE ONE WHITE",
        productSize: ["42.0"],
        ProductId: "10",
    },
];

const ProductPage = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.product.list);

    useEffect(() => {
        dispatch(getAllProduct());
    }, []);

    console.log(productList);

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
