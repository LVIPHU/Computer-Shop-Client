import constantsUser from './../constants/user';
import fetch from './../../services/user';

const actions = {
    listUsers: () => async (dispatch, getState) => {
        try {
            dispatch({
                type: constantsUser.USER_LIST_REQUEST,
            });

            const { data } = await fetch.getAllUser();

            dispatch({
                type: constantsUser.USER_LIST_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constantsUser.USER_LIST_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    },

    getUserDetails: (id) => async (dispatch, getState) => {
        try {
            dispatch({
                type: constantsUser.USER_DETAIL_REQUEST,
            });

            const { data } = await fetch.getDetailUser(id);

            dispatch({
                type: constantsUser.USER_DETAIL_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constantsUser.USER_DETAIL_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    },

    updateUser: (user) => async (dispatch, getState) => {
        try {
            dispatch({
                type: constantsUser.USER_UPDATE_REQUEST,
            });

            const { data } = await fetch.updateUser(user.id, user);

            dispatch({
                type: constantsUser.USER_UPDATE_SUCCESS,
            });
            dispatch({ type: constantsUser.USER_DETAIL_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: constantsUser.USER_UPDATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    },

    deleteUser: (id) => async (dispatch, getState) => {
        try {
            dispatch({
                type: constantsUser.USER_DELETE_REQUEST,
            });

            await fetch.deleteUser(id);

            dispatch({
                type: constantsUser.USER_DELETE_SUCCESS,
            });
        } catch (error) {
            dispatch({
                type: constantsUser.USER_DELETE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    },
};

export default actions;
