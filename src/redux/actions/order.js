import fetch from '@/services/order';
import constantsOrder from '../constants/order';

const actions = {
    createOrder: (order, cartItems) => async (dispatch, getState) => {
        try {
            dispatch({ type: constantsOrder.ORDER_CREATE_RESET });

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getState().auth.userLogin.accessToken}`,
                },
            };
            const { data } = await fetch.createOrder();
            for (let i = 0; i < cartItems.length; i++) {
                let orderDetails = {
                    order_id: data.data.id,
                    detail_qty: cartItems[i].qty,
                    detail_price: cartItems[i].price,
                    product_id: cartItems[i].product_id,
                };
                // await axios.post('/api/detailorder/add', orderDetails, config);
            }
            dispatch({
                type: constantsOrder.ORDER_CREATE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constantsOrder.ORDER_CREATE_FAIL,
                payload: error.response,
            });
        }
    },
};

export default actions;
