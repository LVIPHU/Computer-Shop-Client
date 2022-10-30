import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import constants from '@/utils/constants';
import React from 'react';

function RequireRole({ children }) {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    let location = useLocation();

    if (userInfo.roles[0] !== constants.ROLES.ADMIN) {
        return <Navigate to="/" state={{ from: location }} replace />;
    } else {
        return children;
    }
}
export default RequireRole;
