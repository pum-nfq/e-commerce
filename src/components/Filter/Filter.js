import { PlusOutlined } from '@ant-design/icons';
import { Checkbox, Collapse, Space } from 'antd';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import i18n from '../../i18n';
import './Filter.scss';

const Filter = (props) => {
  const { onCheck } = props;
  const { Panel } = Collapse;

  const initialListFilterEn = [
    {
      title: 'Brand',
      filters: ['Nike', 'Air Jordan', 'Puma', 'Adidas', 'Reebok', 'MLB'],
    },
    {
      title: 'Price',
      filters: ['Under $100', '$100 - $300', '$300 - $400', 'Over $400'],
    },
    {
      title: 'Size',
      filters: [
        '39.0',
        '39.5',
        '40.0',
        '40.5',
        '41.0',
        '42.0',
        '42.5',
        '43.0',
        '43.5',
        '44.0',
        '44.5',
        '45.0',
        '45.5',
        '46.0',
      ],
    },
  ];

  const initialListFilterVi = [
    {
      title: 'Brand',
      filters: ['Nike', 'Air Jordan', 'Puma', 'Adidas', 'Reebok', 'MLB'],
    },
    {
      title: 'Price',
      filters: [
        'Dưới 2.000.000 đ',
        '2.000.000 đ - 3.000.000 đ',
        '3.000.000 đ - 4.000.000 đ',
        'Trên 4.000.000 đ',
      ],
    },
    {
      title: 'Size',
      filters: [
        '39.0',
        '39.5',
        '40.0',
        '40.5',
        '41.0',
        '42.0',
        '42.5',
        '43.0',
        '43.5',
        '44.0',
        '44.5',
        '45.0',
        '45.5',
        '46.0',
      ],
    },
  ];

  const [defaultPanelOpen, setDefaultPanelOpen] = useState([0, 1, 2]);
  const [listFilter, setListFilter] = useState(initialListFilterEn);
  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth < 768) {
        setDefaultPanelOpen([]);
      } else {
        setDefaultPanelOpen([0, 1, 2]);
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (i18n.language === 'vi') setListFilter(initialListFilterVi);
    else setListFilter(initialListFilterEn);
  }, [i18n.language]);

  const { t } = useTranslation();

  const onCollapse = (index) => {
    const temp = [...defaultPanelOpen];
    const isOpening = defaultPanelOpen.findIndex((item) => item === index);
    // console.log(isOpening);
    if (isOpening >= 0) {
      temp.splice(isOpening, 1);
      setDefaultPanelOpen(temp);
    } else {
      setDefaultPanelOpen([...temp, index]);
    }
  };

  // console.log(defaultPanelOpen);
  const genExtra = (index, title) => (
    <div
      className="header-panel"
      onClick={() => {
        onCollapse(index);
      }}
    >
      <h3 style={{ textTransform: 'uppercase' }}>
        {t(`filter.${title.toLowerCase()}`)}
      </h3>
      <PlusOutlined />
    </div>
  );
  return (
    <div className="filter-wrapper">
      <Collapse ghost activeKey={defaultPanelOpen} expandIconPosition={'start'}>
        {listFilter.map((item, index) => {
          return (
            <Panel
              key={index}
              extra={genExtra(index, item.title)}
              showArrow={false}
            >
              <Space
                direction="vertical"
                className="filter-wrapper__group-filter"
              >
                {item.filters.map((filter, index) => {
                  return (
                    <Checkbox key={index} onChange={onCheck} value={filter}>
                      {filter}
                    </Checkbox>
                  );
                })}
              </Space>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default Filter;
