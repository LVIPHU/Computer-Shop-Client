import React from 'react';
import { CheckCircleOutlined, DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Table, Tooltip, Typography, Popconfirm, Tag } from 'antd';
import actionsBrand from '@/redux/actions/brand';
import * as Redux from 'react-redux';
import GlobalLoading from '@/components/Loading/Global';

const { Title } = Typography;

export default function ImportList() {
    const dispatch = Redux.useDispatch();

    // event: Lấy toàn bộ danh sách sản phẩm
    const importAll = Redux.useSelector((state) => state.importAll);
    const { loading, imports } = importAll;

    // event: cập nhật sản phẩm
    const onCloseEditModal = () => {};

    const onOpenEditModal = (id) => {};

    const onCloseCreateModal = () => {};

    // Cột của bảng
    const columns = [
        {
            title: 'Mã',
            key: 'nhapId',
            dataIndex: 'nhapId',
            render: (nhapId) => <p>{nhapId}</p>,
        },
        {
            title: 'Tên',
            key: 'email',
            dataIndex: 'email',
            render: (email) => <Tooltip title={email}>{email}</Tooltip>,
        },
        {
            title: 'Ngày đặt',
            key: 'createDate',
            dataIndex: 'createDate',
            sorter: (a, b) => {
                if (a.createDate > b.createDate) return 1;
                if (a.createDate < b.createDate) return -1;
                return 0;
            },
        },
        {
            title: 'Trạng thái phiếu nhập',
            key: 'status',
            dataIndex: 'status',
            align: 'center',

            render: (status) => {
                return (
                    <Tag icon={<CheckCircleOutlined />} color="success" className="px-4 py-2">
                        {status}
                    </Tag>
                );
            },
        },
        {
            title: 'Thao tác',
            key: 'actions',
            align: 'center',
            width: 120,
            render: (brand) => (
                <div className="flex justify-around items-center">
                    <Tooltip title="Chỉnh sửa" placement="left">
                        <EditOutlined className="action-btn-product text-blue-500 text-base" />
                    </Tooltip>

                    <Tooltip title="Xóa" placement="left">
                        <Popconfirm
                            title="Không thể khôi phục được, bạn có chắc muốn xoá ?"
                            placement="topRight"
                            onConfirm={() => {
                                dispatch(actionsBrand.deleteBrand(brand.id));
                            }}
                            okText="xác nhận"
                            cancelText="hủy"
                        >
                            <DeleteOutlined className="action-btn-product text-red-500 text-base" />
                        </Popconfirm>
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
                    <div className="mb-8 flex justify-between items-center">
                        <Title level={3}>THỂ LOẠI</Title>
                        <Button icon={<PlusCircleOutlined />}>Thêm thể loại</Button>
                    </div>
                    {/* table show brand list */}
                    <Table
                        pagination={{
                            pageSize: 10,
                            position: ['bottomCenter'],
                            showSizeChanger: false,
                        }}
                        className="admin-see-product"
                        columns={columns}
                        dataSource={imports}
                    />
                    {/* edit Brand modal */}
                </div>
            )}
        </>
    );
}
