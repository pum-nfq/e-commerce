import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

import SearchList from '../SearchList/SearchList';
import './Search.scss';

export default function Search(props) {
  const {
    searchProducts,
    searchInput,
    searchStatus,
    hideSearch,
    onSearch,
    onChangeInput,
  } = props;

  useEffect(() => {
    const searchWrapper = document.querySelector('.search__wrapper');
    const search = document.querySelector('.search');
    if (searchStatus) {
      searchWrapper.classList.add('search__wrapper--display');
      setTimeout(() => {
        searchWrapper.classList.add('search__wrapper--transition');
        search.classList.add('search--display');
      }, 10);
    } else {
      setTimeout(() => {
        searchWrapper.classList.remove('search__wrapper--display');
        searchWrapper.classList.remove('search__wrapper--transition');
      }, 210);
      search.classList.remove('search--display');
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
            onChangeInput(e.target.value);
          }}
        />
        <div className="search__close-btn" onClick={hideSearch}>
          <CloseOutlined />
        </div>
        <SearchList searchProducts={searchProducts} />
      </div>
      <div className="search__overlays" onClick={hideSearch}></div>
    </div>
  );
}
