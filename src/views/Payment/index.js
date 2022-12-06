import { HomeOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Input, message, Radio, Result, Row } from 'antd';
// import addressApi from 'apis/addressApi';
// import orderApi from 'apis/orderApi';
import CartPayment from '@/components/Cart//Payment';
import constants from '@/utils/constants';
import AddressUserList from '@/views/Profile/UserAddressList';
import helpers from '@/utils/helpers';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import actionsOrder from '@/redux/actions/order';
// import cartReducers from 'reducers/carts';

// fn: Lấy địa chỉ giao hàng của user theo index
const getUserDeliveryAdd = async (userId, index = 0) => {
    // try {
    //     const response = await addressApi.getDeliveryAddressList(userId, 1);
    //     if (response) {
    //         return response.data.list[index];
    //     }
    //     return null;
    // } catch (err) {
    //     return null;
    // }
};

function PaymentPage() {
    const dispatch = useDispatch();

    // ghi chú đơn hàng
    const note = useRef('');
    const addressIndex = useRef(-1);
    const [transport, setTransport] = useState(0);
    const [address, setAddress] = useState('');
    const cart = useSelector((state) => state.cart);
    const { cartItems, shippingInfo } = cart;

    const authLogin = useSelector((state) => state.authLogin);
    const { userInfo } = authLogin;
    const [isLoading, setIsLoading] = useState(false);
    const [isOrderSuccess, setIsOrderSuccess] = useState(false);
    // giá tạm tính
    // const tempPrice = carts.reduce((a, b) => a + (b.price + (b.price * b.discount) / 100) * b.amount, 0);
    const tempPrice = cartItems.reduce((a, b) => a + b.price * b.qty, 0);
    const transportFee =
        tempPrice >= 1000000 ? 0 : constants.TRANSPORT_METHOD_OPTIONS.find((item) => item.value === transport).price;
    // fn: hiển thị danh sách đơn hàng
    // Note: Chưa kiểm tra tình trạng thật của sản phẩm trong db !
    function showOrderInfo(carts) {
        return carts.map((item, index) => (
            <Card key={index}>
                <Card.Meta
                    avatar={<Avatar size={48} shape="square" src={item.image} alt="Photo" />}
                    title={helpers.reduceProductName(item.name, 40)}
                    description={
                        <>
                            <span>{`Số lượng: ${item.amount}`}</span>
                            <p className="font-size-16px font-weight-700">{helpers.formatProductPrice(item.price)}</p>
                        </>
                    }
                />
            </Card>
        ));
    }

    const order = {
        status: 'pending',
        total_price: tempPrice + transportFee,
        id_user: userInfo.id,
        address: shippingInfo?.sentData?.address,
        phone: shippingInfo?.sentData?.phone,
    };

    // event: đặt hàng
    const onCheckout = async () => {
        dispatch(actionsOrder.createOrder(order, cartItems));
        // try {
        //     setIsLoading(true);
        //     const owner = user._id;
        //     if (addressIndex.current === -1) {
        //         message.warn('Vui lòng chọn địa chỉ giao hàng');
        //         setIsLoading(false);
        //         return;
        //     }
        //     const deliveryAdd = await getUserDeliveryAdd(owner, addressIndex.current);
        //     const paymentMethod = 0,
        //         orderStatus = 0,
        //         transportMethod = transport;
        //     const orderDate = new Date();
        //     const productList = carts.map((item, index) => {
        //         const { amount, name, price, discount, _id } = item;
        //         return {
        //             numOfProd: amount,
        //             orderProd: { name, price, discount, id: _id },
        //         };
        //     });
        //     const response = await orderApi.postCreateOrder({
        //         owner,
        //         deliveryAdd,
        //         paymentMethod,
        //         orderStatus,
        //         transportMethod,
        //         transportFee,
        //         orderDate,
        //         productList,
        //         note: note.current,
        //     });
        //     if (response && response.status === 200) {
        //         setTimeout(() => {
        //             message.success('Đặt hàng thành công', 2);
        //             setIsLoading(false);
        //             setIsOrderSuccess(true);
        //             dispatch(cartReducers.resetCart());
        //         }, 1000);
        //     }
        // } catch (error) {
        //     message.error('Đặt hàng thất bại, thử lại', 3);
        //     setIsLoading(false);
        // }
    };

    // rendering ...
    return (
        <>
            {cartItems.length <= 0 && !isOrderSuccess && <Navigate to={constants.ROUTES.CART} replace />}
            {userInfo ? (
                <div className="m-tb-32 container">
                    {isOrderSuccess ? (
                        <Result
                            status="success"
                            title="Đơn hàng của bạn đã đặt thành công."
                            subTitle="Xem chi tiết đơn hàng vừa rồi"
                            extra={[
                                <Button type="default" key="0">
                                    <Link to={constants.ROUTES.ACCOUNT + '/orders'}>Xem chi tiết đơn hàng</Link>
                                </Button>,
                                <Button key="1" type="primary">
                                    <Link to="/">Tiếp tục mua sắm</Link>
                                </Button>,
                            ]}
                        />
                    ) : (
                        <Row gutter={[16, 16]}>
                            {/* Đường dẫn */}
                            <Col span={24} className="d-flex page-position">
                                <Link to="/">
                                    <HomeOutlined
                                        className="p-12 icon-home font-size-16px bg-white"
                                        style={{ borderRadius: 50 }}
                                    />
                                </Link>
                                <span className="p-lr-8 font-weight-500" style={{ lineHeight: '40px' }}>{`>`}</span>
                                <span className="p-8 font-weight-500 bg-white" style={{ borderRadius: 50 }}>
                                    Tiến hành thanh toán
                                </span>
                            </Col>

                            {/* Thông tin giao hàng  */}
                            <Col span={24} md={16}>
                                {/* địa chỉ giao nhận, cách thức giao */}
                                <div className="p-12 bg-white bor-rad-8 m-tb-16">
                                    <h2>Thông tin giao hàng</h2>
                                    <Radio.Group
                                        defaultValue={transport}
                                        onChange={(v) => setTransport(v.target.value)}
                                        className="m-tb-8"
                                    >
                                        {constants.TRANSPORT_METHOD_OPTIONS.map((item, index) => (
                                            <Radio key={index} value={item.value}>
                                                {item.label}
                                            </Radio>
                                        ))}
                                    </Radio.Group>
                                    <AddressUserList
                                        isCheckout={true}
                                        onChecked={(value) => (addressIndex.current = value)}
                                    />
                                </div>

                                {/* ghi chú */}
                                <div className="p-16 p-b-32 bg-white bor-rad-8">
                                    <h2 className="m-b-8">Ghi chú cho đơn hàng</h2>
                                    <Input.TextArea
                                        placeholder="Nhập thông tin ghi chú nhà bán"
                                        maxLength={200}
                                        showCount
                                        allowClear
                                        onChange={(value) => (note.current = value.target.value)}
                                    />
                                </div>

                                {/* phương thức thanh toán */}
                                <div className="p-12 bg-white bor-rad-8 m-tb-16">
                                    <h2 className="m-b-8">Phương thức thanh toán</h2>
                                    <p>Thông tin thanh toán của bạn sẽ luôn được bảo mật</p>
                                    <Row gutter={[16, 16]}>
                                        <Col span={24} md={12}>
                                            <div className="p-tb-8 p-lr-16 bg-gray item-active">
                                                <b className="font-size-16px">Thanh toán khi nhận hàng</b>
                                                <p>Thanh toán bằng tiền mặt khi nhận hàng tại nhà hoặc showroom.</p>
                                            </div>
                                        </Col>
                                        <Col
                                            span={24}
                                            md={12}
                                            onClick={() =>
                                                message.warn(
                                                    'Tính năng đang được cập nhật. Rất xin lỗi quý khách vì sự bất tiện này',
                                                    3,
                                                )
                                            }
                                        >
                                            <div className="p-tb-8 p-lr-16 bg-gray">
                                                <b className="font-size-16px">Thanh toán Online qua cổng VNPAY</b>
                                                <p>Thanh toán qua Internet Banking, Visa, Master, JCB, VNPAY-QR.</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>

                            {/* đặt hàng */}
                            <Col span={24} md={8}>
                                {/* thồng tin đơn hàng */}
                                <div className="p-12 bg-white bor-rad-8 m-tb-16">
                                    <div className="d-flex justify-content-between">
                                        <h2>Thông tin đơn hàng</h2>
                                        <Button type="link" size="large">
                                            <Link to={constants.ROUTES.CART}>Chỉnh sửa</Link>
                                        </Button>
                                    </div>
                                    <div>{showOrderInfo(cartItems)}</div>
                                </div>

                                {/* tiến hành đặt hàng */}
                                <div className="bg-white">
                                    <CartPayment
                                        transportFee={transportFee}
                                        isLoading={isLoading}
                                        cartItems={cartItems}
                                        isCheckout={true}
                                        onCheckout={onCheckout}
                                    />
                                    <div className="t-center p-b-16">
                                        <span
                                            style={{
                                                color: '#ff5000',
                                            }}
                                        >{`(Xin vui lòng kiểm tra lại đơn hàng trước khi đặt mua)`}</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )}
                </div>
            ) : (
                <Navigate to={constants.ROUTES.LOGIN} replace />
            )}
        </>
    );
}

export default PaymentPage;
