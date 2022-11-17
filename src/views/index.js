import React from 'react';
import Home from './Home';
import Login from './Login';
import Register from './Register';

const pages = {
    // Home: React.lazy(() => import('./Home')),
    // Login: React.lazy(() => import('./Login')),
    // Register: React.lazy(() => import('./Register')),

    Home: Home,
    Login: Login,
    Register: Register,
};

export default pages;
