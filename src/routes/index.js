import pages from '@/views';
import constans from '@/utils/constants';

export const publicRoutes = [
    { path: constans.ROUTES.HOME, component: pages.Home },
    { path: constans.ROUTES.LOGIN, component: pages.Login },
    { path: constans.ROUTES.REGISTER, component: pages.Register },
    { path: constans.ROUTES.FILTER, component: pages.Home },
    { path: constans.ROUTES.PRODUCT, component: pages.Product },
    { path: constans.ROUTES.CART, component: pages.Cart },
    { path: '*', component: pages.Login },
];

export const privateRoutes = [
    { path: constans.ROUTES.HOME, component: pages.Home },
    { path: constans.ROUTES.FILTER, component: pages.Home },
    { path: constans.ROUTES.PRODUCT, component: pages.Product },
    { path: constans.ROUTES.CART, component: pages.Cart },
    { path: constans.ROUTES.PAYMENT, component: pages.Payment },
    { path: '*', component: pages.Result_404 },
];

export const adminRoutes = [{ path: constans.ROUTES.MANAGER, component: pages.Admin, layout: null }];
