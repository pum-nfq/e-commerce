import {
    Button,
    Form,
    Popconfirm,
    Space,
    Table,
    Input,
    InputNumber,
    Select,
    Image,
} from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "./AdminPage.scss";
import ModalForm from "../../components/ModalForm/ModalForm";
import { useDispatch, useSelector } from "react-redux";
import {
    createProduct,
    deleteProduct,
    getAllProduct,
    searchProduct,
    updateProduct,
} from "../../store/product/productSlice";
import _ from "lodash";
import { PlusOutlined } from "@ant-design/icons";

const AdminPage = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.product.list);
    const listSearch = useSelector((state) => state.product.listSearch);
    const loading = useSelector((state) => state.product.loading);

    const [isShowModalAdd, setShowModalAdd] = useState(false);
    const [isShowModalEdit, setShowModalEdit] = useState(false);
    const [productToEdit, setProductToEdit] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const [formAddProduct] = Form.useForm();
    const [formEditProduct] = Form.useForm();
    const { Option } = Select;
    const { Search } = Input;

    useEffect(() => {
        dispatch(getAllProduct());
    }, []);

    useEffect(() => {
        if (searchValue) dispatch(searchProduct(searchValue));
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
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
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
                console.log("Validate Failed:", info);
            });
    };

    const handleDeleteProduct = (record) => {
        dispatch(deleteProduct(record.id));
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            width: "5%",
            sorter: (a, b) => a.id - b.id,
        },

        {
            title: "Name",
            dataIndex: "name",
            width: "30%",
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (_, record) => <Image width={200} src={record.image} />,
            width: "15%",
        },
        {
            title: "Brand",
            dataIndex: "brand",
            width: "10%",
            sorter: (a, b) => a.brand.localeCompare(b.brand),
        },
        {
            title: "Price",
            dataIndex: "price",
            width: "5%",
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            width: "5%",
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: "Size",
            dataIndex: "size",
            width: "5%",
            sorter: (a, b) => a.size - b.size,
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            render: (_, record) =>
                moment(record.createdAt).format("YYYY-MM-DD"),
            width: "10%",
            sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
        },
        {
            width: "10%",
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        classname="button-edit"
                        onClick={() => {
                            setShowModalEdit(true);
                            setProductToEdit(record);
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
    ];
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
                            message: "Please input the name of product!",
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
                            message: "Please input the brand of product!",
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
                            message: "Please input the image of product!",
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
                            message: "Please input the size of product!",
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
                        <Option value={44.5}>44.5</Option>
                        <Option value={45.0}>45.0</Option>
                        <Option value={45.5}>45.5</Option>
                        <Option value={46.0}>46.0</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="quantity"
                    label="Quantity"
                    rules={[
                        {
                            required: true,
                            message: "Please input the quantity of product!",
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
                            message: "Please input the name of product!",
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
                            message: "Please input the brand of product!",
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
                            message: "Please input the image of product!",
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
                            message: "Please input the size of product!",
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
                            message: "Please input the quantity of product!",
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
                            600
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
                    dataSource={searchValue !== "" ? listSearch : productList}
                    loading={loading}
                />
            </Space>
        </div>
    );
};

export default AdminPage;
