import { ClearOutlined, CloseOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

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
    } = props;

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
                            placeholder="Search our store..."
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
                <SearchList searchProducts={searchProducts} />
            </div>
        </>
    );
}
