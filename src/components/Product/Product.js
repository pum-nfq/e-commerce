import React from "react";
import "./Product.scss";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";

export default function Product({ id, image, brand, name, price }) {
    return (
        <div className="product-card">
            <div style={{ overflow: "hidden" }}>
                <Link to={`/detail/${id}`} className="product-card__link">
                    <img className="product-card__img" src={image} />
                </Link>
            </div>
            <h4 className="product-card__title">{brand}</h4>
            <Link to={`/detail/${id}`} className="product-card__link">
                <p className="product-card__text">{name}</p>
            </Link>
            <p className="product-card__price">{price || "Liên hệ"}</p>
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
