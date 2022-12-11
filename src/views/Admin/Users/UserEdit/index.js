import { Col, Form, Input, InputNumber, Modal, Row, Select, DatePicker, Radio } from 'antd';
import constants from '@/utils/constants';
import * as Redux from 'react-redux';
import actionsUser from '@/redux/actions/user';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import GlobalLoading from '@/components/Loading/Global';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';

function UserEditModal(props) {
    const { visible, onClose } = props;
    const dispatch = Redux.useDispatch();

    const userDetail = Redux.useSelector((state) => state.userDetail);
    const { loading, user } = userDetail;

    const userUpdate = Redux.useSelector((state) => state.userUpdate);

    const dateFormat = 'YYYY-MM-DD';

    const { id, firstName, lastName, address, email, phoneNumber, birthday, gender, roles } = user.data
        ? user.data
        : {};

    const initValues = {
        id,
        firstName,
        lastName,
        address,
        email,
        phoneNumber,
        birthday: moment(birthday, dateFormat),
        gender,
        roles,
    };

    // const role =
    //     user.data.roles[0] && user.data.roles[0] === 'ROLE_ADMIN'
    //         ? 'admin'
    //         : user.data.roles[0] && user.data.roles[0] === 'ROLE_USER'
    //         ? 'user'
    //         : '';

    const [value, setValue] = useState('admin');

    // const [value, setValue] = useState('admin');

    // event: Sửa chữa người dùng
    const onEdit = async (value) => {
        // value.roles = [value.roles];
        console.log(value);
        // dispatch(actionsUser.updateUser(value));
    };

    const onChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <Modal
            className="edit-product-modal"
            destroyOnClose={false}
            maskClosable={false}
            visible={visible}
            okText="Cập nhật"
            cancelText="Huỷ bỏ"
            onCancel={onClose}
            okButtonProps={{ form: 'editForm', htmlType: 'submit' }}
            title="Chỉnh sửa thông tin người dùng"
            confirmLoading={userUpdate.loading}
            width={1000}
            centered
        >
            {loading ? (
                <GlobalLoading content="Đang tải thông tin người dùng ..." />
            ) : (
                <Form initialValues={initValues} name="editForm" onFinish={(value) => onEdit(value)}>
                    <Row gutter={[16, 16]}>
                        {/* Id */}
                        <Col span={12}>
                            <Form.Item name="id">
                                <Input disabled size="large" placeholder="ID" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name="role" rules={[{ required: true, message: 'Bắt buộc', whitespace: true }]}>
                                <Radio.Group value={value} onChange={onChange}>
                                    <Radio value={'admin'}>Quản lý</Radio>
                                    <Radio value={'user'}>Khách</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        {/* Họ người dùng */}
                        <Col span={12}>
                            <Form.Item
                                name="firstName"
                                rules={[{ required: true, message: 'Bắt buộc', whitespace: true }]}
                            >
                                <Input size="large" placeholder="Họ người dùng *" />
                            </Form.Item>
                        </Col>

                        {/* Tên người dùng */}
                        <Col span={12}>
                            <Form.Item
                                name="lastName"
                                rules={[{ required: true, message: 'Bắt buộc', whitespace: true }]}
                            >
                                <Input size="large" placeholder="Tên người dùng *" />
                            </Form.Item>
                        </Col>

                        {/* Ngày sinh người dùng */}
                        <Col span={12}>
                            <Form.Item name="birthday">
                                <DatePicker format={dateFormat} size="large" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        {/* số điện thoại người dùng */}
                        <Col span={12}>
                            <Form.Item
                                name="phoneNumber"
                                rules={[{ required: true, message: 'Bắt buộc', whitespace: true }]}
                            >
                                <Input size="large" placeholder="số điện thoại người dùng *" />
                            </Form.Item>
                        </Col>

                        {/* email người dùng */}
                        <Col span={24}>
                            <Form.Item name="email" rules={[{ required: true, message: 'Bắt buộc', whitespace: true }]}>
                                <Input size="large" placeholder="email người dùng *" />
                            </Form.Item>
                        </Col>

                        {/* Địa chỉ người dùng */}
                        <Col span={24}>
                            <Form.Item
                                name="phoneNumber"
                                rules={[{ required: true, message: 'Bắt buộc', whitespace: true }]}
                            >
                                <TextArea rows={2} placeholder="Địa chỉ người dùng *" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            )}
        </Modal>
    );
}

UserEditModal.propTypes = {
    onClose: PropTypes.func,
    visible: PropTypes.bool,
};

export default UserEditModal;
