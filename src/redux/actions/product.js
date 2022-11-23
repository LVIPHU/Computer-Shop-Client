import constants from './../constants/product';
import fetch from '../../services/product';
import { notification } from 'antd';

const openNotificationError = (message) => {
    notification.error({
        message: `Faild`,
        description: `${message}`,
        placement: 'topRight',
    });
};

const openNotificationSucces = (message) => {
    notification.success({
        message: `Success`,
        description: `${message}`,
        placement: 'topRight',
    });
};

const actions = {
    getFilterProducts: (page, size, categoryId) => async (dispatch) => {
        try {
            dispatch({
                type: constants.PRODUCT_FILTER_REQUEST,
            });

            const { data } = await fetch.getFilterProducts(page, size, categoryId);
            console.log(data);

            dispatch({
                type: constants.PRODUCT_FILTER_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constants.PRODUCT_FILTER_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    },

    getListProducts: (page) => async (dispatch) => {
        try {
            dispatch({
                type: constants.PRODUCT_LIST_REQUEST,
            });

            const { data } = await fetch.getListProduct(page);

            dispatch({
                type: constants.PRODUCT_LIST_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constants.PRODUCT_LIST_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    },
};

export default actions;
