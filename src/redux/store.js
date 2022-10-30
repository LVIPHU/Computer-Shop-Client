import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
    },
    authLogin: {
        userInfo: userInfoFromStorage,
    },
};

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

const DataProvider = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default DataProvider;
