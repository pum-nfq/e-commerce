import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import './EmptyCart.scss';

export default function EmptyCart() {
  return (
    <>
      <div className="cart__content-icon">
        <ShoppingCartOutlined />
      </div>
      <div className="cart__content-description">
        Your sneaker cart is empty
      </div>
      <Button>
        <Link to="/">Back to home</Link>
      </Button>
    </>
  );
}
