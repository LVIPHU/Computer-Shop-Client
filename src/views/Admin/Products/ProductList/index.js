import { DeleteOutlined, EditOutlined, EyeOutlined, WarningOutlined } from '@ant-design/icons';
import { Table, Tooltip } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import helpers from '@/utils/helpers';
import React, { useState } from 'react';
import EditProductModal from './ProductEditModal';
import * as Redux from 'react-redux';
import GlobalLoading from '@/components/Loading/Global';

function generateFilter(list) {
    let result = [];
    list.map((item) => result.push({ value: item.id, text: item.name }));
    return result;
}

function SeeProduct() {
    const [editModal, setEditModal] = useState({ visible: false, product: null });
    const [modalDel, setModalDel] = useState({ visible: false, _id: '' });
    const [list, setList] = useState([]);

    // event: Lấy toàn bộ danh sách sản phẩm
    const productAll = Redux.useSelector((state) => state.productAll);
    const { loading, products } = productAll;

    // event: Lấy toàn bộ danh sách thể loại
    const categoryAll = Redux.useSelector((state) => state.categoryAll);
    const { categories } = categoryAll;

    // event: Lấy toàn bộ danh sách thương hiệu
    const brandAll = Redux.useSelector((state) => state.brandAll);
    const { brands } = brandAll;

    // event: xoá sản phẩm
    const onDelete = async (id) => {
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
            filters: generateFilter(categories),
            onFilter: (value, record) => record.categoryId === value,
            render: (categoryName) => (
                <Tooltip title={categoryName}>{helpers.reduceProductName(categoryName, 40)}</Tooltip>
            ),
        },
        {
            title: 'Thương hiệu',
            key: 'brandName',
            dataIndex: 'brandName',
            filters: generateFilter(brands),
            onFilter: (value, record) => record.brandId === value,
            render: (brandName) => <Tooltip title={brandName}>{helpers.reduceProductName(brandName, 40)}</Tooltip>,
        },
        {
            title: 'Tồn kho',
            key: 'quantity',
            dataIndex: 'quantity',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.quantity - b.quantity,
        },

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
            width: 120,
            render: (text) => (
                <div className="flex justify-between items-center">
                    <Tooltip title="Chỉnh sửa" placement="left">
                        <EditOutlined
                            onClick={() => {
                                setEditModal({ visible: true, product: { ...text } });
                            }}
                            className="m-r-8 action-btn-product text-blue-500"
                        />
                    </Tooltip>

                    <Tooltip title="Xem chi tiết" placement="left">
                        <a target="blank" href={`/product/${text.id}`}>
                            <EyeOutlined className="action-btn-product text-green-500" />
                        </a>
                    </Tooltip>

                    <Tooltip title="Xóa" placement="left">
                        <DeleteOutlined
                            onClick={() => setModalDel({ visible: true, id: text.id })}
                            className="m-r-8 action-btn-product text-red-500"
                        />
                    </Tooltip>
                </div>
            ),
        },
    ];

    // rendering ...
    return (
        <>
            {loading ? (
                <GlobalLoading content="Đang tải danh sách sản phẩm ..." />
            ) : (
                <div className="p-32 max-w-100">
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
                </div>
            )}
        </>
    );
}

export default SeeProduct;
