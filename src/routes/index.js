import { Home, Login, Register, Page_404 } from '../views';

// Public routes
const privateRoutes = [
    { path: '/', component: Home },
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
    { path: '*', component: Page_404 },
];

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '*', component: Page_404 },
];

export { publicRoutes, privateRoutes };
