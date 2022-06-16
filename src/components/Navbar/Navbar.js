import {
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import { Link } from 'react-router-dom';

import { getAllProduct } from '../../store/product/productSlice';
import { searchChange } from '../../store/searchFilter/searchFilterSlice';
import {
  productList,
  remainingProductList,
  shoppingList,
} from '../../store/selectors';
import MobileNav from '../MobileNav';
import './Navbar.scss';
import NavbarItem from './NavbarItem';
import Search from './Search';
import SearchBox from './SearchBox';

export default function Navbar() {
  const dispatch = useDispatch();
  const shoppingCart = useSelector(shoppingList);
  const searchProducts = useSelector(remainingProductList);
  const productsList = useSelector(productList);
  const [searchStatus, setSearchStatus] = useState(false);
  const [mobileNavStatus, setMobileNavStatus] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [searchInput, setSearchInput] = useState('');
  const timerId = useRef(0);

  const handleSearch = () => {};

  const handleChangeInput = (input) => {
    setSearchInput(input);
  };

  const handleHideMobileNav = () => {
    setMobileNavStatus(false);
  };

  useEffect(() => {
    dispatch(getAllProduct(productsList));
  }, []);

  useEffect(() => {
    window.onscroll = () => {
      const header__wrapper = document.querySelector('.header__wrapper');
      if (window.pageYOffset) {
        header__wrapper.classList.add('header__wrapper--transition');
      } else {
        header__wrapper.classList.remove('header__wrapper--transition');
      }
    };
  }, []);

  useEffect(() => {
    window.onresize = () => {
      setWidth(window.innerWidth);
    };
  }, [width]);

  useEffect(() => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      // Dispatch Action Search
      dispatch(searchChange(searchInput));
    }, 500);
  }, [searchInput]);

  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__left-menu">
          <div className="header__navbar-mobile">
            <div
              className="header__navbar-mobile-icon"
              onClick={() => setMobileNavStatus(!mobileNavStatus)}
            >
              <MenuOutlined />
            </div>
          </div>
          <MobileNav
            mobileNavStatus={mobileNavStatus}
            hideMobileNav={handleHideMobileNav}
          />
          <ul className="header__menu">
            <NavbarItem href="/" title="home" />
            <NavbarItem href="/product" title="collection" />
            <NavbarItem
              href="#"
              title="brands"
              haveSubnav={true}
              subnavFeature={[
                { href: '#', title: 'nike' },
                { href: '#', title: 'air jordan' },
                { href: '#', title: 'adidas' },
                { href: '#', title: 'puma' },
                { href: '#', title: 'reebok' },
                { href: '#', title: 'mlb' },
              ]}
            />
            <NavbarItem
              href="#"
              title="categories"
              haveSubnav={true}
              subnavFeature={[
                { href: '#', title: 'sneakers' },
                { href: '#', title: 'apparels' },
                { href: '#', title: 'accessories' },
              ]}
            />
            <NavbarItem href="#" title="sale" />
          </ul>
        </div>
        <div className="header__logo">
          <div className="header__logo-wrapper">
            <img
              src="..\assets\img\logo.png"
              alt="header logo"
              className="header__logo-img"
            />
          </div>
        </div>
        <div className="header__right-menu">
          <ul className="header__menu">
            <li className="header__menu-item">
              <a href="#" className="header__item-link">
                releases
              </a>
            </li>
            <li className="header__menu-item">
              <a href="#" className="header__item-link">
                blog
              </a>
            </li>
            <li className="header__menu-item">
              <a href="#" className="header__item-link">
                locations
              </a>
            </li>
          </ul>
          <div className="header__search--wrapper">
            <span
              href="#"
              className="header__search"
              onClick={() => {
                setSearchStatus(!searchStatus);
                setSearchInput('');
              }}
            >
              <SearchOutlined />
            </span>
            {width <= 1000 ? (
              <Search
                searchProducts={!searchInput ? [] : searchProducts}
                searchInput={searchInput}
                searchStatus={searchStatus}
                hideSearch={() => setSearchStatus(false)}
                onSearch={handleSearch}
                onChangeInput={handleChangeInput}
              />
            ) : (
              <SearchBox
                searchProducts={!searchInput ? [] : searchProducts}
                searchInput={searchInput}
                searchStatus={searchStatus}
                hideSearch={() => setSearchStatus(false)}
                onSearch={handleSearch}
                onChangeInput={handleChangeInput}
              />
            )}
          </div>
          <Link to="cart" className="header__cart">
            <ShoppingCartOutlined />
            <span className="cart__total">{shoppingCart.length || 0}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
