import React from "react";
import "./Product.scss";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

export default function Product({imgSource, linkToDetail, productBrand, productName, productPrice}) {
    return (
        <div className="Product-card">
            <div style={{ width: "100%", overflow: "hidden" }}>
                <a href={linkToDetail} className="Product-card__link">
                    <img
                        className="Product-card__img"
                        src={imgSource}
                    />
                </a>
            </div>
            <h4 className="Product-card__title">{productBrand}</h4>
            <a href={linkToDetail} className="Product-card__link">
                <p className="Product-card__text">
                    {productName}
                </p>
            </a>
            <p className="Product-card__price">{productPrice}</p>
            <Button
                className="Product-card__button"
                block
                type="text"
                icon={<PlusOutlined />}
            >
                QUICK ADD
            </Button>
        </div>
    );
}
