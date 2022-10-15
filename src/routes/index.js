import pages from '@/views';
import constans from '@/utils/constants';
// Public routes
const privateRoutes = [
    { path: constans.ROUTES.HOME, component: pages.Home },
    // { path: '/dashboard', component: Blank },
    // { path: '/menu', component: Blank },
    // { path: '/category', component: Category },
    // { path: '/dish', component: Dish },
    // { path: '/order', component: Area },
    // { path: '/area', component: Area },
    // { path: '/area', component: Area },
    // { path: '/area/table', component: Table },
    // { path: '/account', component: Account },
    // { path: '/customer', component: Customer },
    // { path: '/invoice', component: Invoice },
    // { path: '/promotion', component: Promotion },
    { path: '*', component: pages.Home },
];

const publicRoutes = [
    { path: constans.ROUTES.HOME, component: pages.Home },
    { path: constans.ROUTES.LOGIN, component: pages.Login },
    { path: constans.ROUTES.REGISTER, component: pages.Register },
    { path: constans.ROUTES.FILTER, component: pages.Page_404 },
    { path: constans.ROUTES.CART, component: pages.Page_404 },
    { path: '*', component: pages.Home },
];

export { publicRoutes, privateRoutes };
