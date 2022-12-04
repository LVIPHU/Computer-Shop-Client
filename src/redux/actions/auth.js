import constantsAuth from './../constants/auth';
import constantsCart from './../constants/cart';
import constantsUser from './../constants/user';
import fetch from '../../services/auth';
import helpers from '@/utils/helpers';

const actions = {
    login: (account) => async (dispatch) => {
        try {
            dispatch({
                type: constantsAuth.AUTH_LOGIN_REQUEST,
            });

            const { data } = await fetch.login(account);

            dispatch({
                type: constantsAuth.AUTH_LOGIN_SUCCESS,
                payload: data,
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            localStorage.setItem('accessToken', JSON.stringify(data.token));
            helpers.openNotificationSucces('Đăng nhập thành công', 'Chào mừng bạn dến với TTB Store');
        } catch (error) {
            dispatch({
                type: constantsAuth.AUTH_LOGIN_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Đăng nhập thất bại', error.response.data.message)
                : helpers.openNotificationError('Đăng nhập thất bại', error.message);
        }
    },

    register: (email, password, role) => async (dispatch) => {
        try {
            dispatch({
                type: constantsAuth.AUTH_REGISTER_REQUEST,
            });

            const { data } = await fetch.register(email, password, role);

            dispatch({
                type: constantsAuth.AUTH_REGISTER_SUCCESS,
                payload: data,
            });
            dispatch({
                type: constantsAuth.AUTH_LOGIN_SUCCESS,
                payload: data,
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            helpers.openNotificationSucces('Đăng ký thành công', 'Chào mừng bạn dến với TTB Store');
        } catch (error) {
            dispatch({
                type: constantsAuth.AUTH_REGISTER_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Đăng nhập thất bại', error.response.data.message)
                : helpers.openNotificationError('Đăng nhập thất bại', error.message);
        }
    },

    logout: () => async (dispatch) => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('accessToken');
        dispatch({ type: constantsAuth.AUTH_PROFILE_RESET });
        dispatch({ type: constantsCart.CART_RESET });
        dispatch({ type: constantsUser.USER_LIST_RESET });
        dispatch({ type: constantsAuth.AUTH_LOGOUT });
        window.location.href = '/login';
    },
};

export default actions;
