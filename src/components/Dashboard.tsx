import React from 'react';
import { useAuth } from '../contexts/AuthContext';

import './Dashboard.module.scss';

function Dashboard() {

    const { isLogIn } = useAuth();

    return (
        <>
            { isLogIn && <h1>Welcome!</h1>}
            { !isLogIn && <h1>You are not logged in.</h1>}
        </>
    );
}

export default Dashboard;