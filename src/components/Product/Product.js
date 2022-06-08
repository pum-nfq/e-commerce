import React from "react";
import "./Product.scss";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

export default function Product() {
    return (
        <div className="Product-card">
            <div style={{ width: "100%", overflow: "hidden" }}>
                <a className="Product-card__link">
                    <img
                        className="Product-card__img"
                        src="http://snkrsg.com/thumbs/1080x720x2/upload/product/52-9871.jpg"
                    />
                </a>
            </div>
            <h4 className="Product-card__title">AIR JORDAN</h4>
            <a href="#" className="Product-card__link">
                <p className="Product-card__text">
                    AIR JORDAN 1 LOW BULLS [553558-163]
                </p>
            </a>
            <p className="Product-card__price">4.900.000 VND</p>
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
