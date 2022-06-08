import {
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import NavbarItem from "../NavbarItem/NavbarItem";
import SubnavItem from "../SubnavItem/SubnavItem";
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
            <NavbarItem href="#" title="home" />
            <NavbarItem href="#" title="collection" />
            <NavbarItem
              href="#"
              title="brands"
              haveSubnav={true}
              subnavFeature={[
                { href: "#", title: "nike" },
                { href: "#", title: "air jordan" },
                { href: "#", title: "adidas" },
                { href: "#", title: "puma" },
                { href: "#", title: "reebok" },
                { href: "#", title: "mlb" },
              ]}
            />
            <NavbarItem
              href="#"
              title="categories"
              haveSubnav={true}
              subnavFeature={[
                { href: "#", title: "sneakers" },
                { href: "#", title: "apparels" },
                { href: "#", title: "accessories" },
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
