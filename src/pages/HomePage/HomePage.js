import React from 'react';
import './HomePage.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

const HomePage = () => {
  return (
    <div className="home-page-wrapper">
      <div className="slide-show">
        <div
          className="new-arrival panel shadow-box"
          text-bf="NEW ARRIVAL"
        ></div>
        <div
          className="best-seller panel shadow-box"
          text-bf="BEST-SELLER"
        ></div>
        <div className="adidas panel shadow-box" text-bf="ADIDAS"></div>
        <div className="nike panel shadow-box" text-bf="NIKE"></div>
        <div
          className="other panel shadow-box"
          text-bf="PUMA - MLB - FILA"
        ></div>
      </div>
      <div className="top-product">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          <SwiperSlide>
            <div
              className="air-force-1 panel card-footer"
              text-bf="AIR FORCE 1"
            ></div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="air-jordan-1 panel card-footer"
              text-bf="AIR JORDAN 1"
            ></div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="air-max-1 panel card-footer"
              text-bf="AIR MAX 1"
            ></div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="ultra-boost-1 panel card-footer"
              text-bf="ULTRA BOOST 1"
            ></div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default HomePage;
