import {
    MenuOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import MobileNav from "../MobileNav/MobileNav";
import NavbarItem from "../NavbarItem/NavbarItem";
import Search from "../Search/Search";
import "./Navbar.scss";

export default function Navbar(props) {
    const { handleSearch, searchInput, handleChangeInput } = props;
    const [searchStatus, setSearchStatus] = useState(false);
    const [mobileNavStatus, setMobileNavStatus] = useState(false);

    const handleHideMobileNav = () => {
        setMobileNavStatus(false);
    };

    useEffect(() => {
        window.onscroll = () => {
            const header__wrapper = document.querySelector(".header__wrapper");
            if (window.pageYOffset) {
                header__wrapper.classList.add("header__wrapper--transition");
            } else {
                header__wrapper.classList.remove("header__wrapper--transition");
            }
        };
    }, []);

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
                        searchInput={searchInput}
                        onSearch={handleSearch}
                        onChangeInput={handleChangeInput}
                    />
                    <ul className="header__menu">
                        <NavbarItem href="/" title="home" />
                        <NavbarItem href="/product" title="collection" />
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
                        searchInput={searchInput}
                        searchStatus={searchStatus}
                        hideSearch={() => setSearchStatus(false)}
                        onSearch={handleSearch}
                        onChangeInput={handleChangeInput}
                    />
                    <a href="#" className="header__cart">
                        <ShoppingCartOutlined />
                    </a>
                </div>
            </div>
        </header>
    );
}
