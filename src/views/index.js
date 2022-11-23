import React from 'react';

const pages = {
    Home: React.lazy(() => import('./Home')),
    Login: React.lazy(() => import('./Login')),
    Product: React.lazy(() => import('./Product')),
    Register: React.lazy(() => import('./Register')),
    Filter: React.lazy(() => import('./SearchFilter/Filter')),

    Users: React.lazy(() => import('./Admin/Users')),
    Orders: React.lazy(() => import('./Admin/Orders')),
    Products: React.lazy(() => import('./Admin/Products/SeeProduct')),
    Customers: React.lazy(() => import('./Admin/Customers')),
    Dashboard: React.lazy(() => import('./Admin/Dashboard')),

    Result_403: React.lazy(() => import('./Result/403')),
    Result_404: React.lazy(() => import('./Result/404')),
    Result_500: React.lazy(() => import('./Result/500')),
};

export default pages;
