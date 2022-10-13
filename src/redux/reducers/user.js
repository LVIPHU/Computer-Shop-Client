import constants from '../constants/user';

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case constants.USER_LIST_REQUEST:
            return { loading: true };
        case constants.USER_LIST_SUCCESS:
            return { loading: false, users: action.payload };
        case constants.USER_LIST_FAIL:
            return { loading: false, error: action.payload };
        case constants.USER_LIST_RESET:
            return { users: [] };
        default:
            return state;
    }
};

export const userDetailReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case constants.USER_DETAIL_REQUEST:
            return { ...state, loading: true };
        case constants.USER_DETAIL_SUCCESS:
            return { loading: false, user: action.payload };
        case constants.USER_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        case constants.USER_DETAIL_RESET:
            return { user: {} };
        default:
            return state;
    }
};

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.USER_DELETE_REQUEST:
            return { loading: true };
        case constants.USER_DELETE_SUCCESS:
            return { loading: false, success: true };
        case constants.USER_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case constants.USER_DELETE_RESET:
            return { success: false };
        default:
            return state;
    }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case constants.USER_UPDATE_REQUEST:
            return { loading: true };
        case constants.USER_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case constants.USER_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case constants.USER_UPDATE_RESET:
            return { user: {} };
        default:
            return state;
    }
};