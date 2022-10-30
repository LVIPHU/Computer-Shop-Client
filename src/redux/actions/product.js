import constants from './../constants/product';
import fetch from '../../services/product';
const actions = {
    getFilterProducts: (page, size, categoryId) => async (dispatch) => {
        try {
            dispatch({
                type: constants.PRODUCT_FILTER_REQUEST,
            });

            const { data } = await fetch.getFilterProducts(page, size, categoryId);

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

    register: (email, password, role) => async (dispatch) => {
        try {
            dispatch({
                type: constants.AUTH_REGISTER_REQUEST,
            });

            const { data } = await fetch.register(email, password, role);

            dispatch({
                type: constants.AUTH_REGISTER_SUCCESS,
                payload: data,
            });
            dispatch({
                type: constants.AUTH_LOGIN_SUCCESS,
                payload: data,
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: constants.AUTH_REGISTER_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    },
};

export default actions;