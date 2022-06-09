import React from "react";
import "./Product.scss";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

export default function Product({imgSource, linkToDetail, productBrand, productName, productPrice}) {
    return (
        <div className="product-card">
            <div style={{ overflow: "hidden" }}>
                <a href={linkToDetail} className="product-card__link">
                    <img
                        className="product-card__img"
                        src={imgSource}
                    />
                </a>
            </div>
            <h4 className="product-card__title">{productBrand}</h4>
            <a href={linkToDetail} className="product-card__link">
                <p className="product-card__text">
                    {productName}
                </p>
            </a>
            <p className="product-card__price">{productPrice}</p>
            <Button
                className="product-card__button"
                block
                type="text"
                icon={<PlusOutlined />}
            >
                QUICK ADD
            </Button>
        </div>
    );
}
