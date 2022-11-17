import pages from '@/views';
import constans from '@/utils/constants';

const publicRoutes = [
    { path: constans.ROUTES.HOME, component: pages.Home },
    { path: constans.ROUTES.LOGIN, component: pages.Login },
    { path: constans.ROUTES.REGISTER, component: pages.Register },
    { path: constans.ROUTES.FILTER, component: pages.Home },
    { path: constans.ROUTES.CART, component: pages.Home },
    { path: '*', component: pages.Home },
];

const privateRoutes = [
    { path: constans.ROUTES.HOME, component: pages.Home },
    { path: '*', component: pages.Home },
];

// const AdminRoutes = [
//     { path: constans.ROUTES.HOME, component: pages.Home },
//     { path: '*', component: pages.Home },
// ];

// const ErrorRoutes = [
//     { path: constans.ROUTES.HOME, component: pages.Home },
//     { path: '*', component: pages.Home },
// ];

export { publicRoutes, privateRoutes };
