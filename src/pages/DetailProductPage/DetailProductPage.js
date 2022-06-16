import {
  Avatar,
  Button,
  Comment,
  Form,
  InputNumber,
  List,
  Radio,
  Space,
  Tabs,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Product from '../../components/Product/Product';
import { getAllProduct } from '../../store/product/productSlice';
import './DetailProductPage.scss';

const DetailProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { TabPane } = Tabs;

  const products = useSelector((state) => state.product.list);

  const [product, setProduct] = useState({});
  const [productSelectedSize, setPrductSelectedSize] = useState();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [numberShowRelatedProduct, setNumberShowRelatedProduct] = useState(5);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    dispatch(getAllProduct());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useLayoutEffect(() => {
    function updateSize() {
      console.log(window.innerWidth);
      if (window.innerWidth <= 300) {
        setNumberShowRelatedProduct(1);
      } else if (window.innerWidth <= 400) {
        setNumberShowRelatedProduct(2);
      } else if (window.innerWidth <= 500) {
        setNumberShowRelatedProduct(3);
      } else if (window.innerWidth <= 768) {
        setNumberShowRelatedProduct(4);
      } else {
        setNumberShowRelatedProduct(5);
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const foundProductById = [];
    products.map((item) =>
      item.sizes.forEach((item2) => {
        if (item2.id === id) foundProductById.push(item);
      }),
    );

    if (foundProductById.length > 0) {
      const temp = products.filter(
        (item) => item.brand === foundProductById[0].brand,
      );
      setRelatedProducts(temp);
      setProduct(foundProductById[0]);
      setPrductSelectedSize(foundProductById[0].sizes[0]);
    }
  }, [id, products]);

  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue('');
      setComments([
        ...comments,
        {
          author: 'Han Solo',
          avatar: 'https://joeschmoe.io/api/v1/random',
          content: <p>{value}</p>,
          datetime: moment().fromNow(),
        },
      ]);
    }, 600);
  };

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
                '--swiper-navigation-size': '32px',
              }}
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
            >
              {product.detailImage &&
                [product.image, ...product.detailImage].map((img, index) => (
                  <SwiperSlide key={index}>
                    <img src={img} alt={product.name} />
                  </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
              className="detail-product__carousel__thumb"
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={3}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
            >
              {product.detailImage &&
                [product.image, ...product.detailImage].map((img, index) => (
                  <SwiperSlide key={index}>
                    <img src={img} alt={product.name} />
                  </SwiperSlide>
                ))}
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
                {productSelectedSize.price
                  ? productSelectedSize.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })
                  : 'Contact'}{' '}
                <i
                  style={{
                    color: '#999',
                    fontSize: '16px',
                    fontWeight: '200',
                  }}
                >
                  {productSelectedSize &&
                    '( ' + productSelectedSize.quantity + ' products in stock)'}
                </i>
              </h2>
            </Space>
            <Form
              className="detail-product__content__order"
              name="order"
              autoComplete="off"
            >
              <Space direction="vertical">
                <p>SIZE: </p>
                <Form.Item
                  name="sizeOrder"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose your size!',
                    },
                  ]}
                >
                  <Radio.Group buttonStyle="solid">
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
                  BUY NOW
                </Button>
              </div>
            </Form>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Description" key="1">
                <p style={{ marginBottom: '1rem' }}>
                  The <i>{product.name}</i> fuses court and street style to give
                  you a slam dunk sneaker. The mixed material upper features
                  transparent mesh panels for breathability, while the
                  collapsible heel brings feminine flair to Nike b-ball.
                </p>
                <b style={{ fontSize: '1.25rem' }}>Product details</b>
                <p>
                  <b>Package Dimensions:</b> 33.71 x 20.9 x 11.4 cm
                  <br />
                  <b>Date First Available:</b> 17 December 2021
                  <br />
                  <b>Manufacturer:</b> Nike
                  <br />
                  <b>ASIN:</b> B09NMMX1NK
                  <br />
                  <b>Item model number:</b> DJ0292-103
                  <br />
                  <b>Department:</b> Womens
                  <br />
                  <b>Manufacturer:</b> Nike Item
                  <br />
                  <b>Weight:</b> 948 g
                </p>
              </TabPane>
              <TabPane tab="Shipping" key="2">
                <p>No support</p>
              </TabPane>
              <TabPane tab="Comments" key="3">
                {comments.length > 0 && (
                  <List
                    dataSource={comments}
                    header={`${comments.length} ${
                      comments.length > 1 ? 'replies' : 'reply'
                    }`}
                    itemLayout="horizontal"
                    renderItem={(props) => <Comment {...props} />}
                  />
                )}
                <Comment
                  avatar={
                    <Avatar
                      src="https://joeschmoe.io/api/v1/random"
                      alt="Han Solo"
                    />
                  }
                  content={
                    <>
                      <Form.Item>
                        <TextArea
                          rows={2}
                          onChange={(e) => setValue(e.target.value)}
                          value={value}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          htmlType="submit"
                          loading={submitting}
                          onClick={handleSubmit}
                          type="primary"
                        >
                          Add Comment
                        </Button>
                      </Form.Item>
                    </>
                  }
                />
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div className="related-item">
          <h2 className="related-item__title">Related Items</h2>
          <Swiper
            slidesPerView={numberShowRelatedProduct}
            spaceBetween={30}
            className="ralated-item"
          >
            {relatedProducts &&
              relatedProducts.map((item, index) => (
                <SwiperSlide key={index}>
                  <Product
                    {...item}
                    price={
                      item.sizes[0].price !== null &&
                      item.sizes[0].price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })
                    }
                    id={item.key}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    );
};

export default DetailProductPage;
