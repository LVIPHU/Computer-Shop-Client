import { useDispatch } from 'react-redux';
import cartReducer from 'reducers/carts';
import PropTypes from 'prop-types';
import CartItem from './CartItem';
import React from 'react';
import './index.scss';

function CartOverview(props) {
    const dispatch = useDispatch();
    const { carts } = props;

    // event: xoá 1 sản phẩm trong cart
    const onDelCartItem = (key) => {
        dispatch(cartReducer.delCartItem(key));
    };

    // event: cập nhật số lượng sản phẩm trong cart
    const onUpdateNumOfProd = (key, value) => {
        dispatch(cartReducer.updateCartItem(key, value));
    };

    // rendering...
    return (
        <>
            {carts.map((item, index) => (
                <div key={index} className="m-b-12">
                    <CartItem
                        index={index}
                        {...item}
                        onDelCartItem={onDelCartItem}
                        onUpdateNumOfProd={onUpdateNumOfProd}
                    />
                </div>
            ))}
        </>
    );
}

CartOverview.defaultProps = {
    carts: [],
};

CartOverview.propTypes = {
    carts: PropTypes.array,
};

export default CartOverview;
