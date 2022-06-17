import { Breadcrumb, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import { Link } from 'react-router-dom';

import { shoppingList } from '../../store/selectors';
import { deleteShoppingItem } from '../../store/shoppingList/shoppingListSlice';
import CartWithItems from './CartWithItems/CartWithItems';
import EmptyCart from './EmptyCart/EmptyCart';
import './PaymentPage.scss';

export default function PaymentPage() {
  const dispatch = useDispatch();
  const cartList = useSelector(shoppingList);
  const [payment, setPayment] = useState(1);
  const handleChangePayment = (val) => {
    setPayment(val);
  };

  const handleDeleteItem = (index) => {
    dispatch(deleteShoppingItem(index));
  };

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(cartList));
  }, [cartList]);

  return (
    <div className="cart__wrapper">
      <Layout>
        <Content className="site-layout">
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>
              <Link to="/">HOME</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>CART</Breadcrumb.Item>
          </Breadcrumb>
          <div className="cart__content-wrapper">
            <div className="cart__content">
              {!cartList.length ? (
                <EmptyCart />
              ) : (
                <CartWithItems
                  payment={payment}
                  cartList={cartList}
                  onChangePayment={handleChangePayment}
                  onDeleteItem={handleDeleteItem}
                />
              )}
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}
