import constants from './../constants/auth';
import constantsCart from './../constants/cart';
import constantsUser from './../constants/user';
import fetch from '../../services/auth';
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
    login: (account) => async (dispatch) => {
        try {
            dispatch({
                type: constants.AUTH_LOGIN_REQUEST,
            });

            const { data } = await fetch.login(account);

            dispatch({
                type: constants.AUTH_LOGIN_SUCCESS,
                payload: data,
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            openNotificationSucces('Login success.');
        } catch (error) {
            dispatch({
                type: constants.AUTH_LOGIN_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? openNotificationError(error.response.data.message)
                : openNotificationError(error.message);
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
            openNotificationSucces('Register success.');
        } catch (error) {
            dispatch({
                type: constants.AUTH_REGISTER_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? openNotificationError(error.response.data.message)
                : openNotificationError(error.message);
        }
    },

    logout: () => async (dispatch) => {
        localStorage.removeItem('userInfo');
        dispatch({ type: constants.AUTH_PROFILE_RESET });
        dispatch({ type: constantsCart.CART_RESET });
        dispatch({ type: constantsUser.USER_LIST_RESET });
        dispatch({ type: constants.AUTH_LOGOUT });
        window.location.href = '/login';
    },
};

export default actions;
