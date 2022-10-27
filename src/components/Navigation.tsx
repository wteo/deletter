import React from 'react'

import styles from './Navigation.module.scss';

function Navigation() {
    return (
        <nav className={styles.navigation}>
            <span>Login</span>
            <span>Register</span>
            <span>About</span>
        </nav>
    );
}

export default Navigation;