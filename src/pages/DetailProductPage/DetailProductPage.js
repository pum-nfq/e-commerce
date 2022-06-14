import React, { useEffect, useState } from 'react';
import './DetailProductPage.scss';

import { Button, Form, InputNumber, Radio, Space } from 'antd';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../store/product/productSlice';

const DetailProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.list);

  const [product, setProduct] = useState({});
  const [productSelectedSize, setPrductSelectedSize] = useState();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    dispatch(getAllProduct());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const foundProductById = [];
    products.map((item) =>
      item.sizes.map((item2) => {
        if (item2.id === id) foundProductById.push(item);
        else return null;
      })
    );

    if (foundProductById.length > 0) setProduct(foundProductById[0]);
  }, [id, products]);

  console.log(productSelectedSize);

  if (
    product &&
    Object.keys(product).length !== 0 &&
    Object.getPrototypeOf(product) === Object.prototype
  )
    return (
      <div className="detail-product-page-wrapper">
        <div className="detail-product">
          <div className="detail-product__carousel">
            <Swiper
              className="detail-product__carousel__main"
              style={{
                '--swiper-navigation-color': '#000',
                '--swiper-pagination-color': '#000',
              }}
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
            >
              {/* {product.image.map((img, index) => ( */}
              <SwiperSlide>
                <img src={product.image} alt={product.name} />
              </SwiperSlide>
              {/* ))} */}
            </Swiper>
            <Swiper
              className="detail-product__carousel__thumb"
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={3}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
            >
              <SwiperSlide>
                <img src={product.image} alt="adias" />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="detail-product__content">
            <Space
              direction="vertical"
              size={'small'}
              style={{ width: '100%' }}
            >
              <h2 className="detail-product__content__brand">
                {product.brand.toUpperCase()}
              </h2>
              <h1 className="detail-product__content__name">
                {product.name.toUpperCase()}
              </h1>
              <h2 className="detail-product__content__price">
                {productSelectedSize &&
                  productSelectedSize.price.toLocaleString('vi-VN') +
                    ' VND'}{' '}
                <i
                  style={{ color: '#999', fontSize: '16px', fontWeight: '200' }}
                >
                  {productSelectedSize &&
                    '(Còn ' + productSelectedSize.quantity + ' sản phẩm)'}
                </i>
              </h2>
            </Space>
            <Form
              className="detail-product__content__order"
              name="order"
              autoComplete="off"
            >
              <Space direction="vertical" style={{ width: '60%' }}>
                <p>KÍCH THƯỚC: </p>
                <Form.Item
                  name="sizeOrder"
                  rules={[
                    { required: true, message: 'Please choose your size!' },
                  ]}
                >
                  <Radio.Group
                    buttonStyle="solid"
                    defaultValue={product.sizes[0].size}
                  >
                    <div className="detail-product__content__order__size-wrapper">
                      {product.sizes.map((s, index) => (
                        <Radio.Button
                          value={s.size}
                          key={index}
                          onChange={() => setPrductSelectedSize(s)}
                        >
                          {s.size}
                        </Radio.Button>
                      ))}
                    </div>
                  </Radio.Group>
                </Form.Item>
              </Space>
              <div className="order-wrapper">
                <Form.Item name="numberOrder">
                  <InputNumber
                    min={1}
                    max={productSelectedSize && productSelectedSize.quantity}
                    bordered={false}
                    className="detail-product__content__order__number-order"
                    size="large"
                    defaultValue={1}
                  />
                </Form.Item>

                <Button
                  className="detail-product__content__order__buy-now"
                  type="primary"
                  size="large"
                  htmlType="submit"
                  block
                >
                  MUA NGAY
                </Button>
              </div>
            </Form>
          </div>
        </div>
        <div className="related-item">
          <h2 className="related-item__title">Related Items</h2>
          <Swiper slidesPerView={5} spaceBetween={30} className="ralated-item">
            {/* {product.image.map((img, index) => (
            <SwiperSlide key={index}>
              <Product {...product} image={product.image[0]} />
            </SwiperSlide>
          ))} */}
          </Swiper>
        </div>
      </div>
    );
};

export default DetailProductPage;
