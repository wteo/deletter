import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export function PrivateRoute(props: { children: React.ReactNode }) {

    const { currentUser } = useAuth();
    if (!currentUser) {
        return <Navigate replace to='/login' />;
    }
    return <>{props.children}</>;
}

export default PrivateRoute;