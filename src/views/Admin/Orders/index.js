import { Button, message, Modal, Radio, Spin, Table, Tooltip } from 'antd';
// import adminApi from 'apis/adminApi';
import helpers from '@/utils/helpers';
import React, { useEffect, useState } from 'react';
import * as Redux from 'react-redux';
import { Link } from 'react-router-dom';
import { EyeOutlined, SwapOutlined } from '@ant-design/icons';

function generateFilterOrder() {
    let result = [];
    for (let i = 0; i < 7; ++i) {
        result.push({ value: i, text: helpers.convertOrderStatus(i) });
    }
    return result;
}

function OrderList() {
    const orderLists = Redux.useSelector((state) => state.orderLists);
    const { loading, orders } = orderLists;

    // event: Cập nhật trạng thái đơn hàng
    const updateOrderStatus = async (id, orderStatus) => {
        try {
            // const response = await adminApi.postUpdateOrderStatus(id, orderStatus);
            // if (response) {
            //   message.success('Cập nhật thành công');
            //   setData(
            //     data.map((item) =>
            //       item.orderId === id ? { ...item, orderStatus } : { ...item },
            //     ),
            //   );
            // }
        } catch (error) {
            message.success('Cập nhật thất bại');
        }
    };

    // modal cập nhật trạng thái đơn hàng
    function UpdateOrderStatusModal(defaultVal = 0, orderCode, orderId) {
        let valueCurr = defaultVal;
        const modal = Modal.info({
            width: 768,
            title: `Cập nhật trạng thái đơn hàng #${orderCode}`,
            content: (
                <Radio.Group
                    defaultValue={defaultVal}
                    onChange={(v) => (valueCurr = v.target.value)}
                    className="m-t-12"
                >
                    {generateFilterOrder().map((item, index) => (
                        <Radio className="m-b-8" key={index} value={item.value}>
                            {item.text}
                        </Radio>
                    ))}
                </Radio.Group>
            ),
            centered: true,
            icon: null,
            okText: 'Cập nhật',
            onOk: () => {
                updateOrderStatus(orderId, valueCurr);
                modal.destroy();
            },
        });
    }

    const columns = [
        {
            title: 'khách hàng',
            key: 'id_user',
            dataIndex: 'id_user',
        },
        {
            title: 'Mã đơn hàng',
            key: 'id',
            dataIndex: 'id',
            render: (v) => <a>{v}</a>,
        },
        {
            title: 'Ngày đặt',
            key: 'ngaydat',
            dataIndex: 'ngaydat',
            sorter: (a, b) => {
                if (a.ngaydat > b.ngaydat) return 1;
                if (a.ngaydat < b.ngaydat) return -1;
                return 0;
            },
        },
        {
            title: 'Địa chỉ',
            key: 'address',
            dataIndex: 'address',
            render: (address, record) => <Tooltip title={address}>{helpers.reduceProductName(address, 60)}</Tooltip>,
        },
        {
            title: 'Tổng tiền',
            key: 'total_price',
            dataIndex: 'total_price',
            render: (value) => <b style={{ color: '#333' }}>{helpers.formatProductPrice(value)}</b>,
            sorter: (a, b) => a.total_price - b.total_price,
        },
        // {
        //     title: 'HT thanh toán',
        //     key: 'paymentMethod',
        //     dataIndex: 'paymentMethod',
        //     render: (value) => (value === 0 ? 'Tiền mặt' : 'VNPay'),
        // },
        {
            title: 'Trạng thái đơn hàng',
            key: 'status',
            dataIndex: 'status',
            // filters: generateFilterOrder(),
            // onFilter: (value, record) => record.status === value,
            // render: (value) => helpers.convertOrderStatus(value),
            render: (status) => <div className="flex justify-center items-center">{status}</div>,
        },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (_v, records) => (
                <div className="flex justify-center items-center space-x-4">
                    <Tooltip title="Đổi trạng thái" placement="left" size={24}>
                        <SwapOutlined
                            onClick={() =>
                                UpdateOrderStatusModal(records.orderStatus, records.orderCode, records.orderId)
                            }
                            className="m-r-8 action-btn-product text-blue-500 text-xl"
                        />
                    </Tooltip>

                    <Tooltip title="Xem chi tiết" placement="left">
                        <a target="blank" href={`/product/`}>
                            <EyeOutlined className="action-btn-product text-green-500" />
                        </a>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <>
            {loading ? (
                <Spin className="trans-center" tip="Đang lấy danh sách đơn hàng ..." />
            ) : (
                <Table
                    className="p-32"
                    columns={columns}
                    dataSource={orders}
                    pagination={{ showLessItems: true, position: ['bottomCenter'] }}
                />
            )}
        </>
    );
}

export default OrderList;
