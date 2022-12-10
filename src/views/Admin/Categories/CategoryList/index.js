import React from 'react';
import { DeleteOutlined, EditOutlined, EyeOutlined, WarningOutlined } from '@ant-design/icons';
import { message, Pagination, Spin, Table, Tooltip } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import actionsCategory from '@/redux/actions/category';
import helpers from '@/utils/helpers';
import * as Redux from 'react-redux';
import GlobalLoading from '@/components/Loading/Global';

export default function CategoryList() {
    const dispatch = Redux.useDispatch();
    const [editModal, setEditModal] = React.useState({ visible: false, product: null });
    const [modalDel, setModalDel] = React.useState({ visible: false, _id: '' });
    const [list, setList] = React.useState([]);

    const categoryAll = Redux.useSelector((state) => state.categoryAll);
    const { loading, categories } = categoryAll;

    // event: xoá sản phẩm
    const onDelete = async (_id) => {
     dispatch(actionsCategory)
    };

    // event: cập nhật sản phẩm
    const onCloseEditModal = (newProduct) => {
        const newList = list.map((item) => (item._id !== newProduct._id ? item : { ...item, ...newProduct }));
        setList(newList);
        setEditModal({ visible: false });
    };

    // event: Lấy toàn bộ danh sách sản phẩm
    React.useEffect(() => {
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
            render: (id) => (
                <p>
                    {id}
                </p>
            ),
        },
        {
            title: 'Tên',
            key: 'name',
            dataIndex: 'name',
            render: (name) => <Tooltip title={name}>{name}</Tooltip>,
        },
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
                            onClick={() => setModalDel({ visible: true, _id: text.id })}
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
                        dataSource={categories}
                    />
                    {/* edit product modal */}
                    
                </div>
            )}
        </>
    );
}
