import { SendOutlined } from '@ant-design/icons';
import { Button, Input, Space, Tooltip } from 'antd';
import React from 'react';

import './Footer.scss';
import FooterContent from './FooterContent';

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-wrapper__content-show">
        <FooterContent label="CONTACT INFO">
          <b>Address: Cai Khe Ward, Ninh Kieu District, Can Tho City</b>
          <b>Hotline: 0833495422</b>
          <b>Email: akatsuki@nfq.asia</b>
        </FooterContent>

        <FooterContent label="WORK TIME">
          <b>9:30 to 21:30</b>
        </FooterContent>

        <FooterContent label="CUSTOMER SUPPORT">
          <b>0833495422</b>
        </FooterContent>

        <FooterContent label="Sign up to receive the latest information to receive the earliest promotions.">
          <Input
            suffix={
              <Button type="text" icon={<SendOutlined className="icon" />} />
            }
            placeholder="example@email.com"
            bordered={false}
            className="footer-wrapper__content-show__input"
          />
        </FooterContent>
      </div>
      <div className="footer-wrapper__bottom">
        <p className="footer-wrapper__bottom__copy-right">
          ALL RIGHTS RESERVED. WEB DESIGN : NFQ CO., LTD
        </p>

        <Space>
          <Tooltip title="Vietnamese - Dong (VND)" placement="topLeft">
            <Button
              type="text"
              shape="circle"
              className="footer-wrapper__bottom__lang-btn"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/323/323319.png"
                alt="vietnam"
              />
            </Button>
          </Tooltip>
          <Tooltip title="English - Dollar ($)" placement="topLeft">
            <Button
              type="text"
              shape="circle"
              className="footer-wrapper__bottom__lang-btn"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/197/197374.png"
                alt="england"
              />
            </Button>
          </Tooltip>
        </Space>
      </div>
    </div>
  );
};

export default Footer;
