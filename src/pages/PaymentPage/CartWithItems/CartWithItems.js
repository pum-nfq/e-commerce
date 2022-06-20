import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Space,
  Table,
  Typography,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import i18n from '../../../i18n';
import './CartWithItems.scss';

const { Title } = Typography;

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

export default function CartWithItems(props) {
  const { t } = useTranslation();
  const {
    cartList,
    onChangePayment,
    payment,
    onDeleteItem,
    onUpdateQuantityItem,
    name,
    phone,
    email,
    address,
    onChangeName,
    onChangePhone,
    onChangeEmail,
    onChangeAddress,
    onChangeRequirements,
    requirements,
    onSubmit,
  } = props;
  const [width, setWidth] = useState(window.innerWidth);

  const productList = useMemo(() => {
    let result = [];
    cartList.forEach((item, index) => {
      result.push({
        key: index,
        image: item.image,
        name: item.name,
        size: item.sizes.size,
        price: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(item.sizes.price),
        quantity: item.total,
        amount: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(item.sizes.price * item.total),
        inStock: item.sizes.quantity,
      });
    });
    return result;
  }, [cartList]);
  const columns = useRef([
    {
      title: () => t('checkout.image'),
      dataIndex: 'image',
      render: (_, record) => {
        return (
          <div className="cart__img-wrapper">
            <img src={record.image} alt="product" />
            <span
              onClick={() => onDeleteItem(record.key)}
              className="cart__img-delete-btn"
            >
              delete
            </span>
          </div>
        );
      },
    },
    {
      title: () => t('checkout.name'),
      dataIndex: 'name',
    },
    {
      title: 'Size',
      dataIndex: 'size',
    },
    {
      title: () => t('checkout.price'),
      dataIndex: 'price',
    },
    {
      title: () => t('checkout.quantity'),
      dataIndex: 'quantity',
      render: (_, record) => (
        <InputNumber
          min={1}
          max={record.inStock}
          defaultValue={record.quantity}
          onChange={(e) => onUpdateQuantityItem(record.key, e)}
        />
      ),
    },
    {
      title: () => t('checkout.amount'),
      dataIndex: 'amount',
    },
  ]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
  }, [width]);
  return (
    <div className="cart__content-divider">
      <div className="cart__cartInfo">
        <Title level={4}>{t('checkout.your_cart')}</Title>
        <Table
          columns={columns.current}
          dataSource={productList}
          pagination={false}
          //   bordered
          summary={(pageData) => {
            let total = 0;
            pageData.forEach(({ amount }) => {
              // eslint-disable-next-line no-useless-escape
              total += Number(amount.replace(/[^0-9\.]+/g, ''));
            });
            return (
              <>
                <Table.Summary.Row className="cart__sum-wrapper">
                  <Table.Summary.Cell index={0} colSpan={5}>
                    <span className="cart__sum-word">
                      {t('checkout.total')}
                    </span>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    <span className="cart__sum-price">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(total)}
                    </span>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        />
      </div>
      <div className="cart__deliverInfo">
        <div className="cart__payments">
          <Title level={4}>{t('checkout.payment_methods')}</Title>
          <div className="cart__payments-options">
            <Space direction="vertical">
              <Radio.Group
                value={payment}
                onChange={(e) => onChangePayment(e.target.value)}
              >
                <Radio value={1}>
                  <span className="cart__payments-options-words">
                    {t('checkout.cash_direct')}
                  </span>
                  {payment === 1 ? (
                    <div className="cart__payments-options-description">
                      <p>{t('checkout.cash_direct_description1')}</p>
                      <p>{t('checkout.cash_direct_description2')}</p>
                      <p>{t('checkout.cash_direct_description3')}</p>
                    </div>
                  ) : null}
                </Radio>
                <Radio value={2}>
                  <span className="cart__payments-options-words">
                    {t('checkout.cash_deli')}
                  </span>
                  {payment === 2 ? (
                    <div className="cart__payments-options-description">
                      <p>{t('checkout.cash_deli_description1')}</p>
                      <p>{t('checkout.cash_deli_description2')}</p>
                    </div>
                  ) : null}
                </Radio>
                <Radio value={3}>
                  <span className="cart__payments-options-words">
                    {' '}
                    {t('checkout.banking')}
                  </span>
                  {payment === 3 ? (
                    <div className="cart__payments-options-description">
                      <p>{t('checkout.banking_description')}</p>
                    </div>
                  ) : null}
                </Radio>
              </Radio.Group>
            </Space>
          </div>
        </div>
        <div className="cart__form">
          <Title level={4}> {t('checkout.deli_info')}</Title>
          <Form
            {...layout}
            name="nest-messages"
            validateMessages={validateMessages}
          >
            {width >= 678 ? (
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name={['user', 'name']}
                    rules={[
                      {
                        required: true,
                        message: t('checkout.input_name_requirement'),
                      },
                    ]}
                  >
                    <Input
                      value={name}
                      onInput={(e) => onChangeName(e.target.value)}
                      placeholder={t('checkout.input_name')}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: t('checkout.input_phone_requirement'),
                      },
                    ]}
                  >
                    <Input
                      value={phone}
                      onInput={(e) => onChangePhone(e.target.value)}
                      placeholder={t('checkout.input_phone_requirement')}
                      type="tel"
                    />
                  </Form.Item>
                </Col>
              </Row>
            ) : (
              <>
                <Form.Item
                  name={['user', 'name']}
                  rules={[
                    {
                      required: true,
                      message: t('checkout.input_name_requirement'),
                    },
                  ]}
                >
                  <Input
                    value={name}
                    onInput={(e) => onChangeName(e.target.value)}
                    placeholder={t('checkout.input_name')}
                  />
                </Form.Item>
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: t('checkout.input_phone_requirement'),
                    },
                  ]}
                >
                  <Input
                    value={phone}
                    onInput={(e) => onChangePhone(e.target.value)}
                    placeholder={t('checkout.input_phone')}
                    type="tel"
                  />
                </Form.Item>
              </>
            )}

            <Form.Item
              name={['user', 'email']}
              rules={[
                {
                  type: 'email',
                },
              ]}
            >
              <Input
                value={email}
                onInput={(e) => onChangeEmail(e.target.value)}
                type="email"
                placeholder={t('checkout.input_email')}
              />
            </Form.Item>
            <Form.Item
              name={['user', 'address']}
              rules={[
                {
                  required: true,
                  message: t('checkout.input_address_requirement'),
                },
              ]}
            >
              <Input
                value={address}
                onInput={(e) => onChangeAddress(e.target.value)}
                placeholder={t('checkout.input_address')}
              />
            </Form.Item>
            <Form.Item name={['user', 'website']}>
              <TextArea
                rows={4}
                placeholder={t('checkout.input_requirements')}
                maxLength={6}
                value={requirements}
                onInput={(e) => onChangeRequirements(e.target.value)}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
              <Button type="primary" htmlType="submit" onClick={onSubmit}>
                {t('checkout.checkout')}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
