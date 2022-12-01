import pages from '@/views';
import constans from '@/utils/constants';

const publicRoutes = [
    { path: constans.ROUTES.HOME, component: pages.Home },
    { path: constans.ROUTES.LOGIN, component: pages.Login },
    { path: constans.ROUTES.REGISTER, component: pages.Register },
    { path: constans.ROUTES.FILTER, component: pages.Home },
    { path: constans.ROUTES.CART, component: pages.Home },
    { path: '*', component: pages.Result_403 },
];

const privateRoutes = [
    { path: constans.ROUTES.HOME, component: pages.Home },
    { path: constans.ROUTES.FILTER, component: pages.Home },
    { path: constans.ROUTES.CART, component: pages.Home },
    { path: '*', component: pages.Result_404 },
];

const adminRoutes = [
    { path: constans.ROUTES.DASHBOARD, component: pages.Admin, layout:null },
    { path: '*', component: pages.Result_404 },
];
export { publicRoutes, privateRoutes, adminRoutes };
