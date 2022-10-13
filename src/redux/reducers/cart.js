import constants from '../constants/cart';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case constants.CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.product === item.product);
            if (existItem) {
                return {
                    ...state,
                    cartItems: [...state.cartItems.map((x) => (x.product === existItem.product ? item : x))],
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        case constants.CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload),
            };

        case constants.CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            };
        case constants.CART_RESET:
            return {
                cartItems: [],
            };
        default:
            return state;
    }
};