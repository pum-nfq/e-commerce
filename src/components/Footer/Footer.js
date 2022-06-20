import { SendOutlined } from '@ant-design/icons';
import { Button, Input, Space, Tooltip, message } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import i18n from '../../i18n';
import './Footer.scss';
import FooterContent from './FooterContent';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="footer-wrapper">
      <div className="footer-wrapper__content-show">
        <FooterContent label={t('footer.contact_info')}>
          <b>{t('footer.address')}</b>
          <b>{t('footer.hotline')}: +84 833 495 422</b>
          <b>{t('footer.email')}</b>
        </FooterContent>

        <FooterContent label={t('footer.work_time')}>
          <b>9:30 - 21:30</b>
        </FooterContent>

        <FooterContent label={t('footer.hotline')}>
          <b>+84 833 495 422</b>
        </FooterContent>

        <FooterContent label={t('footer.sign_email')}>
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
              onClick={() => {
                i18n.changeLanguage('vi');
                message.success({
                  content: 'Đổi ngôn ngữ sang tiếng Việt thành công',
                  key: 'change-lang',
                });
              }}
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
              onClick={() => {
                i18n.changeLanguage('en');
                message.success({
                  content: 'Change language to English successfully',
                  key: 'change-lang',
                });
              }}
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
