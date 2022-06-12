import React, { useState } from "react";
import "./DetailProductPage.scss";

import { Button, Form, InputNumber, Radio, Space } from "antd";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Product from "./../../components/Product/Product";

const DetailProductPage = () => {
  const product = {
    name: "FORUM LOW TRIPLE WHITE [FY7755]",
    brand: "ADIDAS",
    price: 2800000,
    size: [40, 41, 42, 42.5, 43, 44, 44.5],
    quantity: 5,
    image: [
      "http://snkrsg.com/thumbs/830x550x1/upload/product/57-3534.jpg",
      "http://snkrsg.com/thumbs/830x550x1/upload/product/575-4392.jpg",
      "http://snkrsg.com/thumbs/830x550x1/upload/product/573-1608.jpg",
      "http://snkrsg.com/thumbs/830x550x1/upload/product/571-1585.jpg",
      "http://snkrsg.com/thumbs/830x550x1/upload/product/572-3423.jpg",
      "http://snkrsg.com/thumbs/830x550x1/upload/product/574-4777.jpg",
      "http://snkrsg.com/thumbs/830x550x1/upload/product/576-4242.jpg",
      "http://snkrsg.com/thumbs/830x550x1/upload/product/577-1435.jpg",
    ],
  };
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="detail-product-page-wrapper">
      <div className="detail-product">
        <div className="detail-product__carousel">
          <Swiper
            className="detail-product__carousel__main"
            style={{
              "--swiper-navigation-color": "#000",
              "--swiper-pagination-color": "#000",
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {product.image.map((img) => (
              <SwiperSlide>
                <img src={img} alt="adias" />
              </SwiperSlide>
            ))}
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
            {product.image.map((img) => (
              <SwiperSlide>
                <img src={img} alt="adias" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="detail-product__content">
          <Space direction="vertical" size={"small"} style={{ width: "100%" }}>
            <h2 className="detail-product__content__brand">
              {product.brand.toUpperCase()}
            </h2>
            <h1 className="detail-product__content__name">
              {product.name.toUpperCase()}
            </h1>
            <h2 className="detail-product__content__price">
              {product.price} VND
            </h2>
          </Space>
          <Form
            className="detail-product__content__order"
            name="order"
            autoComplete="off"
          >
            <Space direction="vertical" style={{ width: "60%" }}>
              <p>KÍCH THƯỚC: </p>
              <Form.Item
                name="sizeOrder"
                rules={[
                  { required: true, message: "Please choose your size!" },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <div className="detail-product__content__order__size-wrapper">
                    {product.size.map((s) => (
                      <Radio.Button value={s}>{s}</Radio.Button>
                    ))}
                  </div>
                </Radio.Group>
              </Form.Item>
            </Space>
            <div className="order-wrapper">
              <Form.Item name="numberOrder">
                <InputNumber
                  min={1}
                  max={product.quantity}
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
          {product.image.map((img) => (
            <SwiperSlide>
              <Product {...product} image={product.image[0]} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DetailProductPage;
