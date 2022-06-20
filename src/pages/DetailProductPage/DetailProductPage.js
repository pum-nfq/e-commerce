import {
  Alert,
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
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Product from '../../components/Product/Product';
import i18n from '../../i18n';
import { getAllProduct } from '../../store/product/productSlice';
import { shoppingList } from '../../store/selectors';
import { addShoppingItem } from '../../store/shoppingList/shoppingListSlice';
import sumUp from '../../utils/sumUp';
import './DetailProductPage.scss';

const DetailProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const shoppingCart = useSelector(shoppingList);
  const { TabPane } = Tabs;
  const [formSelectSize] = useForm();
  const { t } = useTranslation();

  const products = useSelector((state) => state.product.list);
  const [product, setProduct] = useState({});
  const [productSelectedSize, setProductSelectedSize] = useState();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [total, setTotal] = useState(1);
  const [numberShowRelatedProduct, setNumberShowRelatedProduct] = useState(5);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [notiStatus, setNotiStatus] = useState(false);
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const [radioValue, setRadioValue] = useState();

  useEffect(() => {
    let copyShoppingCart = _.cloneDeep(shoppingCart);
    localStorage.setItem(
      'shoppingList',
      JSON.stringify(sumUp(copyShoppingCart)),
    );
  }, [shoppingCart]);

  useEffect(() => {
    if (notiStatus) {
      const notification = document.querySelector('.notification__wrapper');
      notification.classList.add('notification__wrapper--display');
      window.scrollTo(0, 0);
      setTimeout(() => {
        notification.classList.remove('notification__wrapper--display');
        setNotiStatus(false);
      }, 2500);
    }
  }, [notiStatus]);

  useEffect(() => {
    dispatch(getAllProduct());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useLayoutEffect(() => {
    function updateSize() {
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

  const getProductDetail = () => {
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
      setProductSelectedSize(foundProductById[0].sizes[0]);
      setRadioValue(foundProductById[0].sizes[0].size);

      if (i18n.language === 'vi') {
        setProductSelectedSize({
          ...foundProductById[0].sizes[0],
          price: foundProductById[0].sizes[0].price * 23237,
        });
      } else {
        setProductSelectedSize(foundProductById[0].sizes[0]);
      }
    }
  };

  useEffect(() => {
    getProductDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, products, i18n.language]);

  useEffect(() => {
    if (productSelectedSize)
      formSelectSize.setFieldsValue({
        sizeOrder: productSelectedSize.size,
        numberOrder: 1,
      });
    console.log(productSelectedSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSelectedSize]);

  const clickSize = (product) => {
    if (i18n.language === 'vi') {
      setProductSelectedSize({ ...product, price: product.price * 23237 });
    } else {
      setProductSelectedSize(product);
    }
  };

  const handleAddShoppingItem = () => {
    // if (!productSelectedSize) {
    //   alert('Please choose your size');
    //   return;
    // }
    const infoSelectedItem = {
      ...product,
      sizes: product.sizes.filter((size) => size === productSelectedSize)[0],
      total,
    };

    dispatch(addShoppingItem(infoSelectedItem));
    window.scrollTo(0, 0);
    setNotiStatus(true);
  };

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
        <div className="notification__wrapper">
          <Alert
            message={`${product.name} size ${productSelectedSize.size} has been added to your cart`}
            type="success"
            closable
            showIcon
          />
        </div>
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
                {productSelectedSize.price !== null
                  ? t('price_product', { val: productSelectedSize.price })
                  : t('price_product_null')}{' '}
                <i
                  style={{
                    color: '#999',
                    fontSize: '16px',
                    fontWeight: '200',
                  }}
                >
                  {productSelectedSize &&
                    '(' +
                      t('detail_product.products_in_stock', {
                        quantity: productSelectedSize.quantity,
                      }) +
                      ')'}
                </i>
              </h2>
            </Space>
            <Form
              form={formSelectSize}
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
                      message: t('error.not_choose_size'),
                    },
                  ]}
                >
                  <Radio.Group
                    buttonStyle="solid"
                    defaultValue={radioValue}
                    value={radioValue}
                    onChange={(e) => setRadioValue(e.target.value)}
                  >
                    <div className="detail-product__content__order__size-wrapper">
                      {product.sizes.map((product, index) => (
                        <Radio.Button
                          value={product.size}
                          key={index}
                          onClick={() => {
                            setProductSelectedSize(product);
                          }}
                          onChange={() => clickSize(product)}
                        >
                          {product.size}
                        </Radio.Button>
                      ))}
                    </div>
                  </Radio.Group>
                </Form.Item>
              </Space>
              <div className="order-wrapper">
                <Form.Item name="numberOrder">
                  <InputNumber
                    value={total}
                    onChange={(value) => {
                      setTotal(value);
                    }}
                    min={1}
                    max={productSelectedSize && productSelectedSize.quantity}
                    bordered={false}
                    className="detail-product__content__order__number-order"
                    size="large"
                    defaultValue={1}
                  />
                </Form.Item>

                <Button
                  onClick={handleAddShoppingItem}
                  className="detail-product__content__order__buy-now"
                  type="primary"
                  size="large"
                  htmlType="submit"
                  block
                >
                  {t('cta.buy_now')}
                </Button>
              </div>
            </Form>
            <Tabs defaultActiveKey="1">
              <TabPane tab={t('detail_product.description')} key="1">
                <p style={{ marginBottom: '1rem' }}>
                  {t('detail_product.description_content', {
                    name: product.name,
                  })}
                </p>
                <b style={{ fontSize: '1.25rem' }}>
                  {t('detail_product.detail')}
                </b>
                <p>
                  <b>{t('detail_product.package_dimensions')}:</b> 33.71 x 20.9
                  x 11.4 cm
                  <br />
                  <b>{t('detail_product.date_first_available')}:</b> 17 December
                  2021
                  <br />
                  <b>{t('detail_product.manufacturer')}:</b> Nike
                  <br />
                  <b>ASIN:</b> B09NMMX1NK
                  <br />
                  <b>{t('detail_product.item_model_number')}:</b> DJ0292-103
                  <br />
                  <b>{t('detail_product.weight')}:</b> 948 g
                </p>
              </TabPane>
              <TabPane tab={t('detail_product.shipping')} key="2">
                <p>{t('detail_product.no_support')}</p>
              </TabPane>
              <TabPane tab={t('detail_product.comments')} key="3">
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
                          {t('cta.add_comment')}
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
                    price={item.sizes[0].price}
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
