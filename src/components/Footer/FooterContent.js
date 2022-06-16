import { Space } from 'antd';
import React from 'react';

import './FooterContent.scss';

const FooterContent = (props) => {
  const { label, children } = props;
  return (
    <div className="footer-content-wrapper">
      <h4>{label}</h4>
      <Space direction="vertical" size={'small'}>
        {children}
      </Space>
    </div>
  );
};

export default FooterContent;
