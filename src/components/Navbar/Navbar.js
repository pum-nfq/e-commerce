import {
  CloseOutlined,
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useCallback, useState } from "react";
import NavbarItem from "../NavbarItem/NavbarItem";
import Search from "../Search/Search";
import "./Navbar.scss";

export default function Navbar() {
  const [searchStatus, setSearchStatus] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

  console.log(searchInput);

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
          <a
            href="#"
            className="header__search"
            onClick={() => setSearchStatus(!searchStatus)}
          >
            <SearchOutlined />
          </a>
          <Search
            searchStatus={searchStatus}
            hideSearch={() => setSearchStatus(false)}
            searchInput={searchInput}
            changeInput={handleChangeInput}
          />
          <a href="#" className="header__cart">
            <ShoppingCartOutlined />
          </a>
        </div>
      </div>
    </header>
  );
}
