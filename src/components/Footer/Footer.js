import { SendOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import React from 'react';
import './Footer.scss';
import FooterContent from './FooterContent';
const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-wrapper__content-show">
        <FooterContent label="THÔNG TIN LIÊN HỆ">
          <b>Địa chỉ: Phường Cái Khế, Quận Ninh Kiểu, Thành phố Cần Thơ</b>
          <b>Hotline: 0833495422</b>
          <b>Email: akatsuki@nfq.asia</b>
        </FooterContent>

        <FooterContent label="GIỜ LÀM VIỆC">
          <b>9:30 đến 21:30</b>
        </FooterContent>

        <FooterContent label="HỖ TRỢ KHÁCH HÀNG">
          <b>0833495422</b>
        </FooterContent>

        <FooterContent label="Đăng ký để nhận thông tin mới nhất để nhận khuyến mãi sớm nhất.">
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
