import constants from '../constants/order';

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.ORDER_CREATE_REQUEST:
            return {
                loading: true,
            };
        case constants.ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload,
            };

        case constants.ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case constants.ORDER_CREATE_RESET:
            return {
                loading: false,
                success: false,
                order: {},
            };
        default:
            return state;
    }
};

export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case constants.ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case constants.ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            };

        case constants.ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.ORDER_PAY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case constants.ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true,
            };

        case constants.ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case constants.ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
};

export const orderMyListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case constants.ORDER_MY_LIST_REQUEST:
            return {
                loading: true,
            };
        case constants.ORDER_MY_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };
        case constants.ORDER_MY_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case constants.ORDER_MY_LIST_RESET:
            return {
                orders: [],
            };
        default:
            return state;
    }
};

export const orderListsReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case constants.ORDER_LISTS_REQUEST:
            return {
                loading: true,
            };
        case constants.ORDER_LISTS_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };
        case constants.ORDER_LISTS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case constants.ORDER_LISTS_RESET:
            return {
                orders: [],
            };
        default:
            return state;
    }
};

export const orderDeliverReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case constants.ORDER_UPDATE_DELIVER_REQUEST:
            return {
                loading: true,
            };
        case constants.ORDER_UPDATE_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case constants.ORDER_UPDATE_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case constants.ORDER_UPDATE_DELIVER_RESET:
            return { success: false };
        default:
            return state;
    }
};

export const orderDeliveringReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case constants.ORDER_UPDATE_DELIVERING_REQUEST:
            return {
                loading: true,
            };
        case constants.ORDER_UPDATE_DELIVERING_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case constants.ORDER_UPDATE_DELIVERING_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case constants.ORDER_UPDATE_DELIVERING_RESET:
            return { success: false };
        default:
            return state;
    }
};

export const orderCancelReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case constants.ORDER_CANCEL_REQUEST:
            return {
                loading: true,
            };
        case constants.ORDER_CANCEL_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case constants.ORDER_CANCEL_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case constants.ORDER_CANCEL_RESET:
            return { success: false };
        default:
            return state;
    }
};
