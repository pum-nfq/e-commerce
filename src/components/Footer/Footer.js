import { SendOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
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
      <p className="footer-wrapper__copy-right">
        ALL RIGHTS RESERVED. WEB DESIGN : NFQ CO., LTD
      </p>
    </div>
  );
};

export default Footer;
