import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import videoIntro from '../../assets/video/intro.mp4';
import Product from '../../components/Product/Product';
import { getAllProduct } from '../../store/product/productSlice';
import './HomePage.scss';

const featureBlogs = [
  {
    image:
      'http://saigonsneakerstore.com/thumbs/420x290x1/upload/news/cdg-nike-air-foamposite-one-global-launch-6093.png',
    title:
      'COMME des GARÇONS x Nike Air Foamposite One phát hành toàn cầu vào ngày 13 tháng 11',
  },
  {
    image:
      'http://saigonsneakerstore.com/thumbs/420x290x1/upload/news/nike-air-force-1-shadow-sail-pink-glaze-orange-chalk-ci0919-111-8-5508.jpg',
    title:
      'PHỐI MÀU PASTEL MỚI XUẤT HIỆN TRÊN NIKE AIR FORCE 1 SHADOW CHỈ 2.600.000',
  },
  {
    image:
      'http://saigonsneakerstore.com/thumbs/420x290x1/upload/news/211433235114950680843323266722195473548828n-2173.jpg',
    title:
      'CƠN SỐT MỚI TRONG THÁNG 7 NÀY - THE FRAGMENT x TRAVIS SCOTT x JORDAN 1',
  },
  {
    image:
      'http://saigonsneakerstore.com/thumbs/420x290x1/upload/news/sn1-6185.jpg',
    title: 'AIR FORCE 1 “HARE” - “MUST HAVE ITEMS” MÙA TỰU TƯỜNG ',
  },
  {
    image:
      'http://saigonsneakerstore.com/thumbs/420x290x1/upload/news/a-bathing-ape-bapesta-pastel-pack-november-2021-release-date-1-8231.jpg',
    title:
      'BAPE STA chuẩn bị cho mùa xuân năm 2022 với bộ sưu tập màu pastel đầy cá tính',
  },
  {
    image:
      'http://saigonsneakerstore.com/thumbs/420x290x1/upload/news/g-dragon-nike-kwondo-1-friends-and-family-4-3586.jpg',
    title:
      'F&F Exclusive G-Dragon x Nike Kwondo 1 Sự Kết Hợp Mới Lạ Với Phiên Bản Giới Hạn',
  },
  {
    image:
      'http://saigonsneakerstore.com/thumbs/420x290x1/upload/news/nike-blazer-jumbo-dq7639-100-3-3561.jpg',
    title: 'Nike Blazer Mid Jumbo Sunflower "đoá hoa" sắp nở rộ vào mùa Xuân',
  },
  {
    image:
      'http://saigonsneakerstore.com/thumbs/420x290x1/upload/news/nike-air-force-1-dm8871-111-0-3484.jpg',
    title: 'Nike Air Force 1 "NAI-KE" - sức hút của văn hoá Trung Quốc',
  },
  {
    image:
      'http://saigonsneakerstore.com/thumbs/420x290x1/upload/news/nike-air-force-1-low-nn-dj6377-100-5-4707.jpg',
    title:
      'AIR FORCE 1 LOW NEXT NATURE - THIẾT KẾ MỚI TRONG BỘ SƯU TẬP SPRUNG CỦA NIKE',
  },
];

const HomePage = () => {
  const [slidesPerView, setSlidesPerView] = useState(4);
  const productList = useSelector((state) => state.product.list);
  const dispatch = useDispatch();

  SwiperCore.use([Autoplay]);

  // responsive slider
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 576) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 768) {
        setSlidesPerView(2);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(4);
      }
    });
    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  return (
    <div className="home-page-wrapper">
      <div className="video-intro">
        <video src={videoIntro} autoPlay muted loop />
      </div>
      <div className="slide-show">
        <div className="new-arrival panel shadow-box" text-bf="NEW ARRIVAL">
          <Link to="product">
            <img
              src="http://snkrsg.com/thumbs/982x525x1/upload/photo/aaa-1907-4515.jpg"
              style={{ width: '100%' }}
            />
          </Link>
        </div>
        <div className="best-seller panel shadow-box" text-bf="BEST-SELLER">
          <Link to="product">
            <img
              src="http://snkrsg.com/thumbs/489x525x1/upload/photo/2-5051.jpg"
              style={{ width: '100%' }}
            />
          </Link>
        </div>
        <div className="adidas panel shadow-box" text-bf="ADIDAS">
          <Link to="product">
            <img
              src="http://saigonsneakerstore.com/thumbs/489x264x1/upload/photo/originals-ss21-stansmith-drop2-educate-pdp-statement-1-sustainability-v1-dtcm337-643333-7297.jpg"
              style={{ width: '100%' }}
            />
          </Link>
        </div>
        <div className="nike panel shadow-box" text-bf="NIKE">
          <Link to="product">
            <img
              src="	http://snkrsg.com/thumbs/489x264x1/upload/photo/6-8012.jpg"
              style={{ width: '100%' }}
            />
          </Link>
        </div>
        <div className="other panel shadow-box" text-bf="PUMA - MLB - FILA">
          <Link to="product">
            <img
              src="http://snkrsg.com/thumbs/489x264x1/upload/photo/20181112-puma-rs-x-toys-28-1-3522.jpg"
              style={{ width: '100%' }}
            />
          </Link>
        </div>
      </div>

      <div className="top-product">
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          <SwiperSlide>
            <Link to="product">
              <div
                className="air-force-1 panel card-footer"
                text-bf="AIR FORCE"
              >
                <img
                  className="card-img"
                  src="http://snkrsg.com/upload/photo/z2259779602634-fc871114564d062b895219aa7677d4d5-9972.jpg"
                  style={{ width: '100%' }}
                />
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="product">
              <div
                className="air-jordan-1 panel card-footer"
                text-bf="AIR JORDAN"
              >
                <img
                  className="card-img"
                  src="http://snkrsg.com/upload/photo/16489607239744776792407364727650043825883683n-4517.jpg"
                  style={{ width: '100%' }}
                />
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="product">
              <div className="air-max-1 panel card-footer" text-bf="AIR MAX">
                <img
                  className="card-img"
                  src="http://snkrsg.com/upload/photo/21757840740365900064101845820753293603063256n-5097.jpg"
                  style={{ width: '100%' }}
                />
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="product">
              <div
                className="ultra-boost-1 panel card-footer"
                text-bf="ULTRA BOOST"
              >
                <img
                  className="card-img"
                  src="http://snkrsg.com/upload/photo/z2259779602634-fc871114564d062b895219aa7677d4d5-1421.jpg"
                  style={{ width: '100%' }}
                />
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="new-release">
        <h2 className="new-release__heading">new releases</h2>
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{ delay: 1500 }}
          modules={[Pagination]}
        >
          {productList.map((productData) => (
            <SwiperSlide>
              <Product
                {...productData}
                price={productData.sizes[0].price}
                id={productData.key}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="feature-blog">
        <h2 className="feature-blog__heading">feature blogs</h2>
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{ delay: 5000 }}
          modules={[Pagination]}
        >
          {featureBlogs.map((item) => (
            <SwiperSlide>
              <FeatureCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomePage;

function FeatureCard({ image, title }) {
  return (
    <Link to="product">
      <div className="feature-blog-card">
        <div>
          <img style={{ width: '100%' }} src={image} />
        </div>

        <div className="feature-blog-card__content">
          <h4 className="feature-blog-card__text">{title}</h4>
        </div>
      </div>
    </Link>
  );
}
