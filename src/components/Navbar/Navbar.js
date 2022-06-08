import {
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "./Navbar.scss";

export default function Navbar() {
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__left-menu">
          <div className="header__navbar-mobile">
            <div className="header__navbar-mobile-icon">
              <MenuOutlined />
            </div>
          </div>
          <ul className="header__menu">
            <li className="header__menu-item">
              <a href="#" className="header__item-link">
                home
              </a>
            </li>
            <li className="header__menu-item">
              <a href="#" className="header__item-link">
                collection
              </a>
            </li>
            <li className="header__menu-item">
              <a href="#" className="header__item-link">
                brands
              </a>

              <ul className="header__subnav">
                <li className="header__subnav-item">
                  <a href="" className="header__subnav-link">
                    nike
                  </a>
                </li>
                <li className="header__subnav-item">
                  <a href="#" className="header__subnav-link">
                    air jordan
                  </a>
                </li>
                <li className="header__subnav-item">
                  <a href="#" className="header__subnav-link">
                    adidas
                  </a>
                </li>
                <li className="header__subnav-item">
                  <a href="#" className="header__subnav-link">
                    puma
                  </a>
                </li>
                <li className="header__subnav-item">
                  <a href="#" className="header__subnav-link">
                    reebok
                  </a>
                </li>
                <li className="header__subnav-item">
                  <a href="#" className="header__subnav-link">
                    mlb
                  </a>
                </li>
              </ul>
            </li>
            <li className="header__menu-item">
              <a href="#" className="header__item-link">
                categories
              </a>
            </li>
            <li className="header__menu-item">
              <a href="#" className="header__item-link">
                sale
              </a>
            </li>
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
          <a href="#" className="header__search">
            <SearchOutlined className="header__search-icon" />
          </a>
          <a href="#" className="header__cart">
            <ShoppingCartOutlined className="header__cart-icon" />
          </a>
        </div>
      </div>
    </header>
  );
}
