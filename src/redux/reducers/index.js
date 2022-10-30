import { combineReducers } from 'redux';
import { AuthLoginReducer, AuthProfileReducer, AuthRegisterReducer, AuthUpdateProfileReducer } from './auth';
import { CartReducer } from './cart';
import {
    CategoryAllReducer,
    CategoryCreateReducer,
    CategoryDeleteReducer,
    CategoryDetailReducer,
    CategoryUpdateReducer,
} from './category';
import {
    OrderCancelReducer,
    OrderCreateReducer,
    OrderDeliverReducer,
    OrderDeliveringReducer,
    OrderDetailsReducer,
    OrderListsReducer,
    OrderMyListReducer,
    OrderPayReducer,
} from './order';
import {
    ProductAllReducer,
    PeviewCreateReducer,
    ProductCreateReducer,
    ProductDeleteReducer,
    ProductDetailReducer,
    ProductTopReducer,
    ProductFilterReducer,
    ProductUpdateReducer,
} from './product';
import { UserDeleteReducer, UserDetailReducer, UserListReducer, UserUpdateReducer } from './user';

export default combineReducers({
    authLogin: AuthLoginReducer,
    authRegister: AuthRegisterReducer,
    authProfile: AuthProfileReducer,
    authUpdateProfile: AuthUpdateProfileReducer,

    cart: CartReducer,

    categoryAll: CategoryAllReducer,
    categoryCreate: CategoryCreateReducer,
    categoryDelete: CategoryDeleteReducer,
    categoryDetail: CategoryDetailReducer,
    categoryUpdate: CategoryUpdateReducer,

    orderCancel: OrderCancelReducer,
    orderCreate: OrderCreateReducer,
    orderDeliver: OrderDeliverReducer,
    orderDelivering: OrderDeliveringReducer,
    orderDetails: OrderDetailsReducer,
    orderLists: OrderListsReducer,
    orderMyList: OrderMyListReducer,
    orderPay: OrderPayReducer,

    productAll: ProductAllReducer,
    peviewCreate: PeviewCreateReducer,
    productCreate: ProductCreateReducer,
    productDelete: ProductDeleteReducer,
    productDetail: ProductDetailReducer,
    productTop: ProductTopReducer,
    productFilter: ProductFilterReducer,
    productUpdate: ProductUpdateReducer,

    userDelete: UserDeleteReducer,
    userDetail: UserDetailReducer,
    userList: UserListReducer,
    userUpdate: UserUpdateReducer,
});
