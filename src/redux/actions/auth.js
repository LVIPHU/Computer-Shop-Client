import constants from './../constants/auth';
import constantsCart from './../constants/cart';
import constantsUser from './../constants/user';
import fetch from '../../services/auth';
const actions = {
    login: (email, password) => async (dispatch) => {
        try {
            dispatch({
                type: constants.AUTH_LOGIN_REQUEST,
            });

            const { data } = await fetch.login(email, password);

            dispatch({
                type: constants.AUTH_LOGIN_SUCCESS,
                payload: data,
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: constants.AUTH_LOGIN_FAIL,
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
