import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, List } from 'antd';
import constants from '@/utils/constants';
import { Link } from 'react-router-dom';

export default function OrderDetail({ props }) {
    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={props.items}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.image} />}
                            title={<Link to={`${constants.ROUTES.PRODUCT}/${item.id}`}>{item.title}</Link>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                        <div className=' flex justify-between items-center'>
                            <p>{item.qty}</p>
                            <p>item</p>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    );
}

OrderDetail.defaultProps = {
    items: [],
};

OrderDetail.propTypes = {
    items: PropTypes.array,
};
