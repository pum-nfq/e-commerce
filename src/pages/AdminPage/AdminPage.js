import { PlusOutlined, TagOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Layout,
  Menu,
  Popconfirm,
  Select,
  Space,
  Table,
} from 'antd';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalForm from '../../components/ModalForm/ModalForm';
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  searchProduct,
  updateProduct,
} from '../../store/product/productSlice';
import './AdminPage.scss';

const AdminPage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.list);
  const listSearch = useSelector((state) => state.product.listSearch);
  const loading = useSelector((state) => state.product.loading);

  const [isShowModalAdd, setShowModalAdd] = useState(false);
  const [isShowModalEdit, setShowModalEdit] = useState(false);
  const [isShowModalAddNewSize, setShowModalAddNewSize] = useState(false);
  const [productToEdit, setProductToEdit] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [valueToAddNewSize, setValueToAddNewSize] = useState({});
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const [formAddProduct] = Form.useForm();
  const [formEditProduct] = Form.useForm();
  const { Option } = Select;
  const { Search } = Input;
  const { Content, Footer, Sider } = Layout;

  useEffect(() => {
    if (!productList) dispatch(getAllProduct());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchValue) dispatch(searchProduct(searchValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const handleAddProduct = () => {
    formAddProduct
      .validateFields()
      .then(async (values) => {
        formAddProduct.resetFields();
        let requestData;
        if (!values.price)
          requestData = {
            ...values,
            price: null,
          };
        else requestData = { ...values };
        dispatch(createProduct(requestData));
        setShowModalAdd(false);
        setShowModalAddNewSize(false);
        setValueToAddNewSize({});
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleEditProduct = () => {
    formEditProduct
      .validateFields()
      .then(async (values) => {
        const requestData = {
          ...values,
          id: productToEdit.id,
          createdAt: productToEdit.createdAt,
        };
        dispatch(updateProduct(requestData));
        setShowModalEdit(false);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleDeleteProduct = (record) => {
    dispatch(deleteProduct(record.id));
  };

  const onTableRowExpand = (expanded, record) => {
    const keys = [];
    if (expanded) {
      keys.push(record.key);
    }
    setExpandedRowKeys(keys);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '50%',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => <Image width={200} src={record.image} />,
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      sorter: (a, b) => a.brand.localeCompare(b.brand),
    },
  ];
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [getItem('Product', '1', <TagOutlined />)];

  // RENDER
  return (
    <div className="admin-page-wrapper">
      <ModalForm
        form={formEditProduct}
        modalTitle="Edit this product"
        formName="edit-this-product"
        isVisible={isShowModalEdit}
        handleOk={() => handleEditProduct()}
        handleCancel={() => setShowModalEdit(false)}
        okText="Update"
        defaultValue={productToEdit}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input the name of product!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="brand"
          label="Brand"
          rules={[
            {
              required: true,
              message: 'Please input the brand of product!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          rules={[
            {
              required: true,
              message: 'Please input the image of product!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Price">
          <InputNumber min={1} max={999999999} addonAfter="VNĐ" />
        </Form.Item>
        <Form.Item
          name="size"
          label="Size"
          rules={[
            {
              required: true,
              message: 'Please input the size of product!',
            },
          ]}
        >
          <Select allowClear>
            <Option value={36.0}>36.0</Option>
            <Option value={36.5}>36.5</Option>
            <Option value={37.0}>37.0</Option>
            <Option value={37.5}>37.5</Option>
            <Option value={38.0}>38.0</Option>
            <Option value={38.5}>38.5</Option>
            <Option value={39.0}>39.0</Option>
            <Option value={39.5}>39.5</Option>
            <Option value={40.0}>40.0</Option>
            <Option value={40.5}>40.5</Option>
            <Option value={41.0}>41.0</Option>
            <Option value={41.5}>41.5</Option>
            <Option value={42.0}>42.0</Option>
            <Option value={42.5}>42.5</Option>
            <Option value={43.0}>43.0</Option>
            <Option value={43.5}>43.5</Option>
            <Option value={44.0}>44.0</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[
            {
              required: true,
              message: 'Please input the quantity of product!',
            },
          ]}
        >
          <InputNumber
            min={1}
            max={999999999}
            defaultValue={1}
            addonAfter="Đôi"
          />
        </Form.Item>
      </ModalForm>

      <ModalForm
        form={formAddProduct}
        modalTitle="Add new product"
        formName="add-new-product"
        isVisible={isShowModalAdd}
        handleOk={() => handleAddProduct()}
        handleCancel={() => setShowModalAdd(false)}
        okText="Create"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input the name of product!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="brand"
          label="Brand"
          rules={[
            {
              required: true,
              message: 'Please input the brand of product!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          rules={[
            {
              required: true,
              message: 'Please input the image of product!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Price">
          <InputNumber min={1} max={999999999} addonAfter="VNĐ" />
        </Form.Item>
        <Form.Item
          name="size"
          label="Size"
          rules={[
            {
              required: true,
              message: 'Please input the size of product!',
            },
          ]}
        >
          <Select allowClear>
            <Option value={36.0}>36.0</Option>
            <Option value={36.5}>36.5</Option>
            <Option value={37.0}>37.0</Option>
            <Option value={37.5}>37.5</Option>
            <Option value={38.0}>38.0</Option>
            <Option value={38.5}>38.5</Option>
            <Option value={39.0}>39.0</Option>
            <Option value={39.5}>39.5</Option>
            <Option value={40.0}>40.0</Option>
            <Option value={40.5}>40.5</Option>
            <Option value={41.0}>41.0</Option>
            <Option value={41.5}>41.5</Option>
            <Option value={42.0}>42.0</Option>
            <Option value={42.5}>42.5</Option>
            <Option value={43.0}>43.0</Option>
            <Option value={43.5}>43.5</Option>
            <Option value={44.0}>44.0</Option>
          </Select>
        </Form.Item>
        <Form.Item name="quantity" label="Quantity">
          <InputNumber
            min={1}
            max={999999999}
            defaultValue={1}
            addonAfter="Đôi"
          />
        </Form.Item>
      </ModalForm>

      <ModalForm
        form={formAddProduct}
        modalTitle="Add new size"
        formName="add-new-size"
        isVisible={isShowModalAddNewSize}
        handleOk={() => handleAddProduct()}
        handleCancel={() => {
          setShowModalAdd(false);
          setShowModalAddNewSize(false);
        }}
        okText="Create"
        defaultValue={valueToAddNewSize}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input the name of product!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="brand"
          label="Brand"
          rules={[
            {
              required: true,
              message: 'Please input the brand of product!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          rules={[
            {
              required: true,
              message: 'Please input the image of product!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Price">
          <InputNumber min={1} max={999999999} addonAfter="VNĐ" />
        </Form.Item>
        <Form.Item
          name="size"
          label="Size"
          rules={[
            {
              required: true,
              message: 'Please input the size of product!',
            },
          ]}
        >
          <Select allowClear>
            <Option value={36.0}>36.0</Option>
            <Option value={36.5}>36.5</Option>
            <Option value={37.0}>37.0</Option>
            <Option value={37.5}>37.5</Option>
            <Option value={38.0}>38.0</Option>
            <Option value={38.5}>38.5</Option>
            <Option value={39.0}>39.0</Option>
            <Option value={39.5}>39.5</Option>
            <Option value={40.0}>40.0</Option>
            <Option value={40.5}>40.5</Option>
            <Option value={41.0}>41.0</Option>
            <Option value={41.5}>41.5</Option>
            <Option value={42.0}>42.0</Option>
            <Option value={42.5}>42.5</Option>
            <Option value={43.0}>43.0</Option>
            <Option value={43.5}>43.5</Option>
            <Option value={44.0}>44.0</Option>
          </Select>
        </Form.Item>
        <Form.Item name="quantity" label="Quantity">
          <InputNumber
            min={1}
            max={999999999}
            defaultValue={1}
            addonAfter="Đôi"
          />
        </Form.Item>
      </ModalForm>

      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo">
            <img
              src="../../assets/img/logo.png"
              alt="akat"
              style={{
                width: '50%',
                backgroundColor: 'white',
                margin: '16px 0',
              }}
            />
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: '24px 16px 0',
            }}
          >
            <Space
              direction="vertical"
              size="large"
              className="admin-page-wrapper__space"
            >
              <div className="admin-page-wrapper__space__control">
                <Search
                  className="admin-page-wrapper__space__control__search"
                  size="large"
                  placeholder="Search name of product"
                  onChange={_.debounce(
                    (e) => setSearchValue(e.target.value),
                    600,
                  )}
                />
                <Button
                  className="admin-page-wrapper__space__control__button-add"
                  icon={<PlusOutlined />}
                  type="primary"
                  block
                  size="large"
                  onClick={() => setShowModalAdd(true)}
                >
                  Add new one
                </Button>
              </div>

              <Table
                columns={columns}
                dataSource={searchValue !== '' ? listSearch : productList}
                loading={loading}
                pagination={{
                  defaultPageSize: 4,
                  showSizeChanger: true,
                  pageSizeOptions: ['4', '8', '16'],
                }}
                expandedRowKeys={expandedRowKeys}
                onExpand={onTableRowExpand}
                expandable={{
                  expandedRowRender: (recordExpand) => (
                    <Table
                      pagination={false}
                      dataSource={recordExpand.sizes}
                      bordered
                      footer={() => (
                        <Button
                          type={'primary'}
                          block
                          onClick={() => {
                            setShowModalAddNewSize(true);
                            setValueToAddNewSize(recordExpand);
                          }}
                        >
                          Add new size
                        </Button>
                      )}
                      columns={[
                        {
                          title: 'ID',
                          dataIndex: 'id',
                          key: 'id',

                          width: '5%',
                          sorter: (a, b) => a.id - b.id,
                        },
                        {
                          title: 'Size',
                          dataIndex: 'size',
                          key: 'size',
                          width: '20%',
                          sorter: (a, b) => a.size - b.size,
                        },
                        {
                          title: 'Quantity',
                          dataIndex: 'quantity',
                          key: 'quantity',
                          width: '20%',
                          sorter: (a, b) => a.quantity - b.quantity,
                        },
                        {
                          title: 'Price',
                          dataIndex: 'price',
                          key: 'price',
                          width: '20%',
                          render: (_, record) => (
                            <p style={{ margin: '0' }}>
                              {record.price !== null
                                ? record.price.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                  })
                                : 'Liên hệ'}
                            </p>
                          ),
                          sorter: (a, b) => a.price - b.price,
                        },
                        {
                          title: 'Created At',
                          dataIndex: '',
                          key: 'x',
                          width: '30%',
                          render: (_, record) =>
                            moment(record.createdAt).format('YYYY-MM-DD'),
                          sorter: (a, b) =>
                            a.createdAt.localeCompare(b.createdAt),
                        },
                        {
                          title: 'Action',
                          width: '10%',
                          render: (_, record) => (
                            <Space size="middle">
                              <Button
                                type="primary"
                                classname="button-edit"
                                onClick={() => {
                                  setShowModalEdit(true);
                                  setProductToEdit({
                                    ...recordExpand,
                                    ...record,
                                  });
                                }}
                              >
                                Edit
                              </Button>

                              <Popconfirm
                                title="Are you sure to delete this user?"
                                onConfirm={() => handleDeleteProduct(record)}
                                onCancel={() => null}
                                okText="Yes"
                                cancelText="No"
                              >
                                <Button type="primary" danger>
                                  Delete
                                </Button>
                              </Popconfirm>
                            </Space>
                          ),
                        },
                      ]}
                    />
                  ),
                }}
              />
            </Space>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            NFQ Asia ©2022 Created by Akatsuki team
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminPage;
