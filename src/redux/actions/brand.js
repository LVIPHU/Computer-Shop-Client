import constantsBrand from './../constants/brands';
import fetch from '../../services/brands';

const actions = {
    getAllBrand: () => async (dispatch) => {
        try {
            dispatch({
                type: constantsBrand.BRAND_ALL_REQUEST,
            });

            const { data } = await fetch.getAllBrand();
            dispatch({
                type: constantsBrand.BRAND_ALL_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constantsBrand.BRAND_ALL_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    },

    getBrandDetail: (id) => async (dispatch, getState) => {
        try {
            dispatch({ type: constantsBrand.BRAND_DETAIL_REQUEST });

            const { data } = await fetch.getDetailBrands(id);

            dispatch({
                type: constantsBrand.BRAND_DETAIL_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constantsBrand.BRAND_DETAIL_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    },

    deleteBrand: (id) => async (dispatch, getState) => {
        try {
            dispatch({
                type: constantsBrand.BRAND_DELETE_REQUEST,
            });

            await fetch.deleteBrands(id);

            dispatch({
                type: constantsBrand.BRAND_DELETE_SUCCESS,
            });
        } catch (error) {
            dispatch({
                type: constantsBrand.BRAND_DELETE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    },

    updatedBrand: (brand) => async (dispatch, getState) => {
        try {
            dispatch({
                type: constantsBrand.BRAND_UPDATE_REQUEST,
            });

            const { data } = await fetch.updateBrands(brand.id, brand);

            dispatch({
                type: constantsBrand.BRAND_UPDATE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constantsBrand.BRAND_UPDATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    },

    createBrand: (brand) => async (dispatch, getState) => {
        try {
            dispatch({
                type: constantsBrand.BRAND_CREATE_REQUEST,
            });

            const { data } = await fetch.createBrands(brand);

            dispatch({
                type: constantsBrand.BRAND_CREATE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constantsBrand.BRAND_CREATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    },
};

export default actions;
