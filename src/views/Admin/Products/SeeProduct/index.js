import { DeleteOutlined, EditOutlined, EyeOutlined, WarningOutlined } from '@ant-design/icons';
import { message, Pagination, Spin, Table, Tooltip } from 'antd';
import Modal from 'antd/lib/modal/Modal';
// import adminApi from 'apis/adminApi';
// import productApi from 'apis/productApi';
import actionsProduct from '@/redux/actions/product';
import actionsCategory from '@/redux/actions/category';
import helpers from '@/utils/helpers';
import React, { useEffect, useState } from 'react';
import EditProductModal from './EditProductModal';
import * as Redux from 'react-redux';

function generateFilterCategory(categories) {
    let result = [];
    categories.map((category) => result.push({ value: category.id, text: category.name }));
    return result;
}

function SeeProduct() {
    const dispatch = Redux.useDispatch();
    const [editModal, setEditModal] = useState({ visible: false, product: null });
    const [modalDel, setModalDel] = useState({ visible: false, _id: '' });
    const [list, setList] = useState([]);

    const productAll = Redux.useSelector((state) => state.productAll);
    const { loading, products } = productAll;

    const categoryAll = Redux.useSelector((state) => state.categoryAll);
    const { categories } = categoryAll;

    console.log(products);

    // event: xoá sản phẩm
    const onDelete = async (_id) => {
        // try {
        //   const response = await adminApi.removeProduct(_id);
        //   if (response && response.status === 200) {
        //     message.success('Xoá thành công.');
        //     const newList = list.filter((item) => item._id !== _id);
        //     setList(newList);
        //     // setTotal(total - 1);
        //   }
        // } catch (error) {
        //   message.error('Xoá thất bại, thử lại !');
        // }
    };

    // event: cập nhật sản phẩm
    const onCloseEditModal = (newProduct) => {
        const newList = list.map((item) => (item._id !== newProduct._id ? item : { ...item, ...newProduct }));
        setList(newList);
        setEditModal({ visible: false });
    };

    // event: Lấy toàn bộ danh sách sản phẩm
    useEffect(() => {
        dispatch(actionsProduct.getAllProducts());
        dispatch(actionsCategory.getAllCategory());
        // let isSubscribe = true;
        // setIsLoading(true);
        // async function getProductList() {
        //   try {
        //     const response = await productApi.getAllProducts(-1);
        //     if (response && isSubscribe) {
        //       const { data } = response.data;
        //       const list = data.map((item, index) => {
        //         return { ...item, key: index };
        //       });
        //       setList(list);
        //       setIsLoading(false);
        //     }
        //   } catch (error) {
        //     if (isSubscribe) setIsLoading(false);
        //     message.error('Lấy danh sách sản phẩm thất bại.');
        //   }
        // }
        // getProductList();
        // return () => {
        //   isSubscribe = false;
        // };
    }, []);

    // Cột của bảng
    const columns = [
        {
            title: 'Mã',
            key: 'id',
            dataIndex: 'id',
            render: (code, data) => (
                <a target="blank" href={`/product/${data._id}`}>
                    {code}
                </a>
            ),
        },
        {
            title: 'Tên',
            key: 'name',
            dataIndex: 'name',
            render: (name) => <Tooltip title={name}>{helpers.reduceProductName(name, 100)}</Tooltip>,
        },
        {
            title: 'Giá',
            key: 'price',
            dataIndex: 'price',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.price - b.price,
            render: (price) => (
                <h3 style={{ color: '#4F55C5' }}>{price ? helpers.formatProductPrice(price) : 'Liên hệ'}</h3>
            ),
        },
        {
            title: 'Loại',
            key: 'categoryName',
            dataIndex: 'categoryName',
            filters: generateFilterCategory(categories),
            onFilter: (value, record) => record.categoryId === value,
            render: (categoryName) => (
                <Tooltip title={categoryName}>{helpers.reduceProductName(categoryName, 40)}</Tooltip>
            ),
        },
        {
            title: 'Tồn kho',
            key: 'quantity',
            dataIndex: 'quantity',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.quantity - b.quantity,
        },
        // {
        //     title: 'Thương hiệu',
        //     key: 'brand',
        //     dataIndex: 'brand',
        //     sorter: (a, b) => {
        //         if (a.brand < b.brand) return -1;
        //         if (a.brand > b.brand) return 1;
        //         return 0;
        //     },
        //     render: (brand) => <Tooltip title={brand}>{helpers.reduceProductName(brand, 40)}</Tooltip>,
        // },
        // {
        //     title: 'Mức giảm giá',
        //     key: 'discount',
        //     dataIndex: 'discount',
        //     defaultSortOrder: 'ascend',
        //     sorter: (a, b) => a.discount - b.discount,
        //     render: (discount) => `${discount} %`,
        // },
        // {
        //     title: 'Đánh giá',
        //     key: 'rate',
        //     dataIndex: 'rate',
        //     render: (rate) => helpers.calStar(rate).toFixed(1),
        // },
        {
            title: 'Hành động',
            key: 'actions',
            fixed: 'right',
            width: 100,
            render: (text) => (
                <>
                    <DeleteOutlined
                        onClick={() => setModalDel({ visible: true, _id: text.id })}
                        className="m-r-8 action-btn-product"
                        style={{ color: 'red' }}
                    />
                    <Tooltip title="Chỉnh sửa" placement="left">
                        <EditOutlined
                            onClick={() => {
                                setEditModal({ visible: true, product: { ...text } });
                            }}
                            className="m-r-8 action-btn-product"
                            style={{ color: '#444' }}
                        />
                    </Tooltip>

                    <Tooltip title="Xem chi tiết" placement="left">
                        <a target="blank" href={`/product/${text.id}`}>
                            <EyeOutlined className="action-btn-product" style={{ color: '#444' }} />
                        </a>
                    </Tooltip>
                </>
            ),
        },
    ];

    // rendering ...
    return (
        <div className="pos-relative p-8">
            {loading ? (
                <Spin tip="Đang tải danh sách sản phẩm ..." size="large" className="trans-center" />
            ) : (
                <>
                    {' '}
                    {/* modal confirm delete product */}
                    <Modal
                        title="Xác nhận xoá sản phẩm"
                        visible={modalDel.visible}
                        onOk={() => {
                            onDelete(modalDel._id);
                            setModalDel({ visible: false, _id: false });
                        }}
                        onCancel={() => setModalDel({ visible: false, _id: false })}
                        okButtonProps={{ danger: true }}
                        okText="Xoá"
                        cancelText="Huỷ bỏ"
                    >
                        <WarningOutlined style={{ fontSize: 28, color: '#F7B217' }} />
                        <b> Không thể khôi phục được, bạn có chắc muốn xoá ?</b>
                    </Modal>
                    {/* table show product list */}
                    <Table
                        pagination={{
                            pageSize: 10,
                            position: ['bottomCenter'],
                            showSizeChanger: false,
                        }}
                        className="admin-see-product"
                        columns={columns}
                        dataSource={products}
                    />
                    {/* edit product modal */}
                    <EditProductModal
                        visible={editModal.visible}
                        onClose={(value) => onCloseEditModal(value)}
                        product={editModal.product}
                    />
                </>
            )}
        </div>
    );
}

export default SeeProduct;
