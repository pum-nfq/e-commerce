import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import "./Search.scss";

export default function Search(props) {
  const { searchInput, searchStatus, hideSearch, onSearch, onChangeInput } =
    props;

  useEffect(() => {
    const searchWrapper = document.querySelector(".search__wrapper");
    const search = document.querySelector(".search");
    if (searchStatus) {
      searchWrapper.classList.add("search__wrapper--display");
      search.classList.add("search--display");
    } else {
      setTimeout(() => {
        searchWrapper.classList.remove("search__wrapper--display");
      }, 200);
      search.classList.remove("search--display");
    }
  }, [searchStatus]);

  return (
    <div className="search__wrapper">
      <div className="search">
        <div className="search__search-btn" onClick={onSearch}>
          <SearchOutlined />
        </div>
        <input
          value={searchInput}
          type="text"
          className="search__input"
          placeholder="Search our store"
          onInput={(e) => {
            onChangeInput(e);
          }}
        />
        <div className="search__close-btn" onClick={hideSearch}>
          <CloseOutlined />
        </div>
      </div>
      <div className="search__overlays" onClick={hideSearch}></div>
    </div>
  );
}
