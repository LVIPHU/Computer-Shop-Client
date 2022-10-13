import constants from '../constants/product';

export const productTrendingReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case constants.PRODUCT_TRENDING_REQUEST:
            return { loading: true, products: [] };
        case constants.PRODUCT_TRENDING_SUCCESS:
            return { loading: false, products: action.payload };
        case constants.PRODUCT_TRENDING_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productTopReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case constants.PRODUCT_TOP_REQUEST:
            return { loading: true, products: [] };
        case constants.PRODUCT_TOP_SUCCESS:
            return { loading: false, products: action.payload };
        case constants.PRODUCT_TOP_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productDetailReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case constants.PRODUCT_DETAIL_REQUEST:
            return { loading: true, product: { reviews: [] } };
        case constants.PRODUCT_DETAIL_SUCCESS:
            return { loading: false, product: action.payload };
        case constants.PRODUCT_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productAllReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case constants.PRODUCT_ALL_REQUEST:
            return { loading: true, products: [] };
        case constants.PRODUCT_ALL_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            };
        case constants.PRODUCT_ALL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const reviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true };
        case constants.PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true };
        case constants.PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        case constants.PRODUCT_CREATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.PRODUCT_DELETE_REQUEST:
            return { loading: true };
        case constants.PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case constants.PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case constants.PRODUCT_DELETE_RESET:
            return { success: false };
        default:
            return state;
    }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case constants.PRODUCT_UPDATE_REQUEST:
            return { loading: true };
        case constants.PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case constants.PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case constants.PRODUCT_UPDATE_RESET:
            return { product: {} };
        default:
            return state;
    }
};

export const productCreateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case constants.PRODUCT_CREATE_REQUEST:
            return { loading: true };
        case constants.PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case constants.PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case constants.PRODUCT_CREATE_RESET:
            return { success: false };
        default:
            return state;
    }
};
