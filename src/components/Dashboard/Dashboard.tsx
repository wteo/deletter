import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

import styles from './Dashboard.module.scss';

function Dashboard() {

    const { currentUser } = useAuth();

    return (
        <div id={styles.dashboard}>
            <h1>Welcome!</h1>
            <p>You are currently logged in as { currentUser?.email } </p>
        </div>
    );
}

export default Dashboard;