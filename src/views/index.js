import React from 'react';

const pages = {
    Home: React.lazy(() => import('./Home')),
    Login: React.lazy(() => import('./Login')),
    Register: React.lazy(() => import('./Register')),
};

export default pages;
