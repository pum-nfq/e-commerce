import React from 'react';
import Filter from '../../components/Filter/Filter';
import './ProductPage.scss';

const ProductPage = () => {
  const onCheckFilter = (e) => {
    console.log(e.target.checked);
  };

  return (
    <div className="product-page-container">
      <div className="product-page-container__filter-container">
        <Filter onCheck={onCheckFilter} />
      </div>
      <div className="product-page-container__products-list-view-container"></div>
    </div>
  );
};

export default ProductPage;
