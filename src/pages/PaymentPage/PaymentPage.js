import { ShoppingCartOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Layout } from 'antd';
import { Typography } from 'antd';
import { Table } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

import './PaymentPage.scss';

const { Title } = Typography;

const columns = [
  {
    title: 'Image',
    dataIndex: 'image',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
];
const data = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //   },
  {
    key: '1',
    image: 'src',
    name: 'test',
    price: 120,
    quantity: 1,
    amount: 2,
  },
  {
    key: '2',
    image: 'src',
    name: 'test',
    price: 120,
    quantity: 1,
    amount: 2,
  },
];

export default function PaymentPage() {
  // const data = useRef(() => {
  //   return [
  //     {
  //       key: '1',
  //       image: 'src',
  //       name: 'test',
  //       price: 120,
  //       quantity: 1,
  //       amount: 2,
  //     },
  //   ];
  // });
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
              {/* <div className="cart__content-icon">
                <ShoppingCartOutlined />
              </div>
              <div className="cart__content-description">
                Your sneaker cart is empty
              </div>
              <Button>
                <Link to="/">Back to home</Link>
              </Button> */}
              <div className="cart__cartInfo">
                <Title level={4}>your cart</Title>
                <Table columns={columns} dataSource={data} size="middle" />
              </div>
              <div className="cart__deliverInfo"></div>
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}
