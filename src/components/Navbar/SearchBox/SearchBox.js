import { ClearOutlined, CloseOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import SearchList from '../SearchList/SearchList';
import './SearchBox.scss';

export default function SearchBox(props) {
  const {
    searchProducts,
    searchInput,
    searchStatus,
    hideSearch,
    onSearch,
    onChangeInput,
    onClickItem,
  } = props;

  const { t } = useTranslation();

  useEffect(() => {
    const searchBox = document.querySelector('.searchBox__wrapper');
    if (searchStatus) {
      searchBox.classList.add('searchBox__wrapper--display');
    } else {
      searchBox.classList.remove('searchBox__wrapper--display');
    }
  }, [searchStatus]);

  return (
    <>
      <div className="searchBox__wrapper">
        <div className="searchBox">
          <div className="searchBox__input-wrapper">
            <input
              value={searchInput}
              onInput={(e) => onChangeInput(e.target.value)}
              type="text"
              className="searchBox__input"
              placeholder={t('field.search_nav.placeholder')}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onSearch();
                }
              }}
            />
            <div
              className="searchBox__clear-btn"
              onClick={() => {
                onChangeInput('');
              }}
            >
              <ClearOutlined />
            </div>
          </div>
          <div
            className="searchBox__close-btn"
            onClick={() => {
              hideSearch();
              onChangeInput('');
            }}
          >
            <CloseOutlined />
          </div>
        </div>
        <SearchList onClickItem={onClickItem} searchProducts={searchProducts} />
      </div>
    </>
  );
}
