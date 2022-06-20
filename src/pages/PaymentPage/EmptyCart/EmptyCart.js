import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import './EmptyCart.scss';

export default function EmptyCart() {
  const { t } = useTranslation();

  return (
    <>
      <div className="cart__content-icon">
        <ShoppingCartOutlined />
      </div>
      <div className="cart__content-description">{t('checkout.empty')}</div>
      <Button>
        <Link to="/">{t('checkout.back_home')}</Link>
      </Button>
    </>
  );
}
