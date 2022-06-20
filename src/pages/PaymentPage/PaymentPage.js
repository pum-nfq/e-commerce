import { Alert, Breadcrumb, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import { Link } from 'react-router-dom';

import { shoppingList } from '../../store/selectors';
import {
  deleteAllItem,
  deleteShoppingItem,
  updateShoppingItem,
} from '../../store/shoppingList/shoppingListSlice';
import CartWithItems from './CartWithItems/CartWithItems';
import EmptyCart from './EmptyCart/EmptyCart';
import './PaymentPage.scss';

export default function PaymentPage() {
  const dispatch = useDispatch();
  const cartList = useSelector(shoppingList);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [requirements, setRequirements] = useState('');
  const [payment, setPayment] = useState(1);
  const [successStatus, setSuccessStatus] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const handleChangePayment = (val) => {
    setPayment(val);
  };

  const handleDeleteItem = (index) => {
    dispatch(deleteShoppingItem(index));
  };

  const handleUpdateQuantityItem = (index, value) => {
    // console.log(index, value);
    dispatch(updateShoppingItem({ index, value }));
  };

  const handleChangeName = (value) => {
    setName(value);
  };
  const handleChangePhone = (value) => {
    setPhone(value);
  };
  const handleChangeEmail = (value) => {
    setEmail(value);
  };
  const handleChangeAddress = (value) => {
    setAddress(value);
  };
  const handleChangeRequirements = (value) => {
    setRequirements(value);
  };

  const handleSubmit = () => {
    if (!name & !phone & !address) {
      // Display alert message
      setErrorStatus(true);
    }
    // Display success alert
    else {
      setSuccessStatus(true);
      // Dispatch action handle reduce item' quantity
    }
  };

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(cartList));
  }, [cartList]);

  useEffect(() => {
    if (errorStatus) {
      const errorMsg = document.querySelector('.cart__error-msg');
      errorMsg.classList.add('cart__error-msg--display');
      setTimeout(() => {
        errorMsg.classList.remove('cart__error-msg--display');
        setErrorStatus(false);
      }, 2000);
    }
  }, [errorStatus]);

  useEffect(() => {
    if (successStatus) {
      const successMsg = document.querySelector('.cart__success-msg');
      successMsg.classList.add('cart__success-msg--display');
      dispatch(deleteAllItem());
      setTimeout(() => {
        successMsg.classList.remove('cart__success-msg--display');
        setErrorStatus(false);
      }, 2000);
    }
  }, [successStatus]);

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
                  name={name}
                  phone={phone}
                  email={email}
                  address={address}
                  requirements={requirements}
                  onChangeName={handleChangeName}
                  onChangePhone={handleChangePhone}
                  onChangeEmail={handleChangeEmail}
                  onChangeAddress={handleChangeAddress}
                  onChangeRequirements={handleChangeRequirements}
                  payment={payment}
                  cartList={cartList}
                  onChangePayment={handleChangePayment}
                  onDeleteItem={handleDeleteItem}
                  onUpdateQuantityItem={handleUpdateQuantityItem}
                  onSubmit={handleSubmit}
                />
              )}
            </div>
          </div>
        </Content>
      </Layout>
      <div className="cart__success-msg">
        <Alert
          message="Checkout success"
          description="Your order has been recorded and delivered as soon as possible."
          type="success"
          showIcon
          closable
        />
      </div>
      <div className="cart__error-msg">
        <Alert
          message="Checkout fail"
          description="Please check your detail information."
          type="error"
          showIcon
          closable
        />
      </div>
    </div>
  );
}
