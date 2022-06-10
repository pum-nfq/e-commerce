import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import "./MobileNav.scss";

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
  getItem("HOME", "1"),
  getItem("COLLECTION", "2"),
  getItem("BRANDS", "sub1", null, [
    getItem("NIKE", "3"),
    getItem("AIR JORDAN", "4"),
    getItem("ADIDAS", "5"),
    getItem("PUMA", "6"),
    getItem("REEBOK", "7"),
    getItem("MLB", "8"),
  ]),
  getItem("CATEGORIES", "sub2", null, [
    getItem("SNEAKERS", "9"),
    getItem("APPAREL", "10"),
    getItem("ACCESSORIES", "11"),
  ]),
  getItem("SALE", "12"),
  getItem("RELEASES", "13"),
  getItem("BLOG", "14"),
  getItem("LOCATIONS", "15"),
];

const rootSubmenuKeys = ["sub1", "sub2"];

export default function MobileNav(props) {
  const {
    mobileNavStatus,
    hideMobileNav,
    searchInput,
    onSearch,
    onChangeInput,
  } = props;

  const [openKeys, setOpenKeys] = useState(["1"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    const mobileNavWrapper = document.querySelector(".mobileNav__wrapper");
    const mobileNav = document.querySelector(".mobileNav");
    if (mobileNavStatus) {
      mobileNavWrapper.classList.add("mobileNav__wrapper--display");
      mobileNav.classList.add("mobileNav--display");
    } else {
      setTimeout(() => {
        mobileNavWrapper.classList.remove("mobileNav__wrapper--display");
      }, 200);
      mobileNav.classList.remove("mobileNav--display");
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
          />
        </div>
        <div className="mobileNav__search-wrapper">
          <input
            value={searchInput}
            onInput={(e) => {
              onChangeInput(e);
            }}
            type="text"
            className="mobileNav_search-input"
            placeholder="Search our store"
          />
          <div className="mobileNav_search-icon" onClick={onSearch}>
            <SearchOutlined />
          </div>
        </div>
      </div>
      <div className="mobileNav__overlays" onClick={hideMobileNav}></div>
    </div>
  );
}
