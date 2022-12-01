import constants from './../constants/category';
import fetch from '../../services/category';
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
    getAllCategory: () => async (dispatch) => {
        try {
            dispatch({
                type: constants.CATEGORY_ALL_REQUEST,
            });

            const { data } = await fetch.getAllCategory();
            dispatch({
                type: constants.CATEGORY_ALL_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constants.CATEGORY_ALL_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    },
};

export default actions;
