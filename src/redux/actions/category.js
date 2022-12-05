import constantsCategory from './../constants/category';
import fetch from '../../services/category';

const actions = {
    getAllCategory: () => async (dispatch) => {
        try {
            dispatch({
                type: constantsCategory.CATEGORY_ALL_REQUEST,
            });

            const { data } = await fetch.getAllCategory();
            dispatch({
                type: constantsCategory.CATEGORY_ALL_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constantsCategory.CATEGORY_ALL_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    },
};

export default actions;
