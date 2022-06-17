import { Button, List, Popover } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Product from '../Product/Product';
import './ProductList.scss';

export default function ProductList({ title, data, sorter }) {
  const { t } = useTranslation();

  const content = (
    <div>
      <Button onClick={sorter} type="text">
        <strong>{t('cta.sort_price')}</strong>
      </Button>
      <Button onClick={sorter} type="text">
        <strong>{t('cta.sort_name')}</strong>
      </Button>
      <Button onClick={sorter} type="text">
        <strong>{t('cta.sort_brand')}</strong>
      </Button>
      <Button onClick={sorter} type="text">
        <strong>{t('cta.default')}</strong>
      </Button>
    </div>
  );

  return (
    <div className="product-list">
      <div className="product-list__header">
        <h2 className="product-list__title">{t(`${title.toLowerCase()}`)}</h2>
        <Popover content={content} trigger="click" placement="bottomLeft">
          <Button type="text">
            <strong>{t('cta.sort')}</strong>
          </Button>
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
