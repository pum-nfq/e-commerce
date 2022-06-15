import React from 'react';
import 'antd/dist/antd.css';
import Product from '../Product/Product';
import { List, Popover, Button } from 'antd';
import './ProductList.scss';

export default function ProductList({ title, data, sorter }) {

  const content = (
    <div>
      <Button onClick={sorter} type='text'><strong>Sort by Price</strong></Button>
      <Button onClick={sorter} type='text'><strong>Sort by Name</strong></Button>
      <Button onClick={sorter} type='text'><strong>Sort by Brand</strong></Button>
      <Button onClick={sorter} type='text'><strong>Default</strong></Button>
    </div>
  )

  return (
    <div className="product-list">
      <div className='product-list__header'>
        <h2 className="product-list__title">{title}</h2>
        <Popover content={content} trigger="click" placement="bottomLeft">
          <Button type="text"><strong>SORT</strong></Button>
        </Popover>
      </div>
      <List
        className="product-list__list-antd"
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
          pageSize: 20,
        }}
        renderItem={(item) => (
          <List.Item>
            <Product {...item} price={item.sizes[0].price} id={item.key} />
          </List.Item>
        )}
      />
    </div>
  );
}
