import React from "react";
import "antd/dist/antd.css"
import Product from "../Product/Product"
import { List, Pagination } from "antd";
import "./ProductList.scss"

export default function ProductList({ title, data }) {
    return (
        <div className="product-list">
            <h2 className="product-list__title">{title}</h2>
            <List
                grid={{
                    gutter: 10,
                    xs: 2,
                    sm: 2,
                    md: 3,
                    lg: 3,
                    xl: 3,
                    xxl: 3,
                }}
                dataSource={data}
                pagination={{
                    pageSize: 20
                }}
                renderItem={(item) => (
                    <List.Item>
                        <Product {...item} />
                    </List.Item>
                )}
            />
        </div>
    );
}
