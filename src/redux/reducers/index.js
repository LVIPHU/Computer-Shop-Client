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
    ProductTrendingReducer,
    ProductUpdateReducer,
} from './product';
import { UserDeleteReducer, UserDetailReducer, UserListReducer, UserUpdateReducer } from './user';

export default combineReducers({
    AuthLogin: AuthLoginReducer,
    AuthRegister: AuthRegisterReducer,
    AuthProfile: AuthProfileReducer,
    AuthUpdateProfile: AuthUpdateProfileReducer,

    Cart: CartReducer,

    CategoryAll: CategoryAllReducer,
    CategoryCreate: CategoryCreateReducer,
    CategoryDelete: CategoryDeleteReducer,
    CategoryDetail: CategoryDetailReducer,
    CategoryUpdate: CategoryUpdateReducer,

    OrderCancel: OrderCancelReducer,
    OrderCreate: OrderCreateReducer,
    OrderDeliver: OrderDeliverReducer,
    OrderDelivering: OrderDeliveringReducer,
    OrderDetails: OrderDetailsReducer,
    OrderLists: OrderListsReducer,
    OrderMyList: OrderMyListReducer,
    OrderPay: OrderPayReducer,

    ProductAll: ProductAllReducer,
    PeviewCreate: PeviewCreateReducer,
    ProductCreate: ProductCreateReducer,
    ProductDelete: ProductDeleteReducer,
    ProductDetail: ProductDetailReducer,
    ProductTop: ProductTopReducer,
    ProductTrending: ProductTrendingReducer,
    ProductUpdate: ProductUpdateReducer,

    UserDelete: UserDeleteReducer,
    UserDetail: UserDetailReducer,
    UserList: UserListReducer,
    UserUpdate: UserUpdateReducer,
});
