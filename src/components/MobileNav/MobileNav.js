import { CloseOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './MobileNav.scss';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem(<Link to="/">HOME</Link>, '1'),
  getItem(<Link to="/product">COLLECTION</Link>, '2'),
  getItem('BRANDS', 'sub1', null, [
    getItem('NIKE', '3'),
    getItem('AIR JORDAN', '4'),
    getItem('ADIDAS', '5'),
    getItem('PUMA', '6'),
    getItem('REEBOK', '7'),
    getItem('MLB', '8'),
  ]),
  getItem('CATEGORIES', 'sub2', null, [
    getItem('SNEAKERS', '9'),
    getItem('APPAREL', '10'),
    getItem('ACCESSORIES', '11'),
  ]),
  getItem('SALE', '12'),
  getItem('RELEASES', '13'),
  getItem('BLOG', '14'),
  getItem('LOCATIONS', '15'),
  getItem(<Link to="/cart">YOUR CART</Link>, '16'),
];

const rootSubmenuKeys = ['sub1', 'sub2'];

export default function MobileNav(props) {
  const { mobileNavStatus, hideMobileNav } = props;

  const [openKeys, setOpenKeys] = useState(['1']);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleOnClick = () => {
    window.scrollTo(0, 0);
    const mobileNavWrapper = document.querySelector('.mobileNav__wrapper');
    const mobileNav = document.querySelector('.mobileNav');
    setTimeout(() => {
      mobileNavWrapper.classList.remove('mobileNav__wrapper--display');
      mobileNavWrapper.classList.remove('mobileNav__wrapper--transition');
    }, 200);
    mobileNav.classList.remove('mobileNav--display');
    hideMobileNav();
  };

  useEffect(() => {
    const mobileNavWrapper = document.querySelector('.mobileNav__wrapper');
    const mobileNav = document.querySelector('.mobileNav');
    if (mobileNavStatus) {
      mobileNavWrapper.classList.add('mobileNav__wrapper--display');

      setTimeout(() => {
        mobileNavWrapper.classList.add('mobileNav__wrapper--transition');
        mobileNav.classList.add('mobileNav--display');
      }, 10);
    } else {
      setTimeout(() => {
        mobileNavWrapper.classList.remove('mobileNav__wrapper--display');
        mobileNavWrapper.classList.remove('mobileNav__wrapper--transition');
      }, 200);
      mobileNav.classList.remove('mobileNav--display');
    }
  }, [mobileNavStatus]);

  return (
    <div className="mobileNav__wrapper">
      <div className="mobileNav">
        <div className="mobileNav__close-btn-wrapper">
          <div className="mobileNav__close-btn" onClick={hideMobileNav}>
            <CloseOutlined />
          </div>
        </div>
        <div className="mobileNav__list">
          <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            style={{
              width: 256,
            }}
            items={items}
            onClick={handleOnClick}
          />
        </div>
      </div>
      <div className="mobileNav__overlays" onClick={hideMobileNav}></div>
    </div>
  );
}
