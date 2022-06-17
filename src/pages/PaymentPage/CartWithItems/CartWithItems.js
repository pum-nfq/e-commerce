import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Layout,
  Radio,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import './CartWithItems.scss';

const { Text } = Typography;
const { Title } = Typography;
const { Option } = Select;

const columns = [
  {
    title: 'Image',
    dataIndex: 'image',
    render: (imgSrc) => {
      return (
        <div className="cart__img-wrapper">
          <img src={imgSrc} />
          <span className="cart__img-delete-btn">delete</span>
        </div>
      );
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Size',
    dataIndex: 'size',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    render: (quantity) => (
      <InputNumber min={1} max={10} defaultValue={quantity} />
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
];

const data = [
  {
    key: '1',
    image: 'http://snkrsg.com/thumbs/830x550x1/upload/product/18-5098.jpg',
    name: 'COURT VISION ALTA TXT LIGHT SOFT PINK MAGIC EMBER',
    size: 36,
    price: 120,
    quantity: 1,
    amount: 2,
  },
  {
    key: '1',
    image: 'http://snkrsg.com/thumbs/830x550x1/upload/product/18-5098.jpg',
    name: 'COURT VISION ALTA TXT LIGHT SOFT PINK MAGIC EMBER',
    size: 36,
    price: 120,
    quantity: 1,
    amount: 2,
  },
];

const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
  },
};

const validateMessages = {
  required: 'This field is required!',
  types: {
    email: 'Email is not a valid email!',
  },
};

export default function CartWithItems() {
  return (
    <div className="cart__content-divider">
      <div className="cart__cartInfo">
        <Title level={4}>your cart</Title>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          //   bordered
          summary={(pageData) => {
            let total = 0;
            pageData.forEach(({ amount }) => {
              total += amount;
            });
            return (
              <>
                <Table.Summary.Row className="cart__sum-wrapper">
                  <Table.Summary.Cell index={0} colSpan={5}>
                    <span className="cart__sum-word">Total</span>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    <span className="cart__sum-price">{total}</span>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        />
      </div>
      <div className="cart__deliverInfo">
        <div className="cart__payments">
          <Title level={4}>payments:</Title>
          <div className="cart__payments-options">
            <Space direction="vertical">
              <Radio>
                <span className="cart__payments-options-words">
                  Cash directly at store
                </span>
              </Radio>
              <Radio>
                <span className="cart__payments-options-words">
                  Cash on delivery
                </span>
              </Radio>
              <Radio>
                <span className="cart__payments-options-words">Banking</span>
              </Radio>
            </Space>
          </div>
        </div>
        <div className="cart__form">
          <Title level={4}>delivery information:</Title>
          <Form
            {...layout}
            name="nest-messages"
            validateMessages={validateMessages}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name={['user', 'name']}
                  //   label="Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your name!',
                    },
                  ]}
                >
                  <Input placeholder="Enter your name..." />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  //   label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your phone number!',
                    },
                  ]}
                >
                  <Input placeholder="Enter your phone number..." type="tel" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name={['user', 'email']}
              //   label="Email"
              rules={[
                {
                  type: 'email',
                },
              ]}
            >
              <Input type="email" placeholder="Enter your email..." />
            </Form.Item>
            <Form.Item
              name={['user', 'address']}
              //   label="Address"
              rules={[
                {
                  required: true,
                  message: 'Please input your address!',
                },
              ]}
            >
              <Input placeholder="Enter your address..." />
            </Form.Item>
            <Form.Item name={['user', 'website']}>
              <TextArea
                rows={4}
                placeholder="Other requirements... (optional)"
                maxLength={6}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
              <Button type="primary" htmlType="submit">
                check out
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
