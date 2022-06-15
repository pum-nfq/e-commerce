import { Checkbox, Collapse, Space } from 'antd';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import './Filter.scss';

const { Panel } = Collapse;
const Filter = (props) => {
  const { onCheck } = props;

  const [defaultPanelOpen, setDefaultPanelOpen] = useState([
    '0',
    '1',
    '2',
    '3',
  ]);

  useLayoutEffect(() => {
    function updateSize() {
      // console.log(window.innerWidth)
      if (window.innerWidth < 768) {
        setDefaultPanelOpen([]);
      } else {
        setDefaultPanelOpen(['0', '1', '2', '3']);
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const listFilter = [
    {
      title: 'Categories',
      filters: ['Sneaker', 'Apparel', 'Accessories'],
    },
    {
      title: 'Branch',
      filters: ['Nike', 'Air Jordan', 'Puma', 'Adidas', 'Reebok', 'MLB'],
    },
    {
      title: 'Giá',
      filters: [
        'Dưới 2.000.000',
        '2.000.000 - 3.000.000',
        '3.000.000 - 4.000.000',
        'Trên 4.000.000',
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
  return (
    <div className="filter-wrapper">
      <Collapse ghost activeKey={defaultPanelOpen} expandIconPosition={'end'}>
        {listFilter.map((item, index) => {
          return (
            <Panel header={item.title.toUpperCase()} key={index}>
              <Space
                direction="vertical"
                className="filter-wrapper__group-filter"
              >
                {item.filters.map((filter, index) => {
                  return (
                    <Checkbox key={index} onChange={onCheck} value={filter}>
                      {filter.toUpperCase()}
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
