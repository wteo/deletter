import React from 'react'
import { useAuth } from '../contexts/AuthContext';

import styles from './Navigation.module.scss';
import logo from '../images/logo.PNG';

function Navigation() {

    const { isLogIn } = useAuth();

    const navLogOut = (
        <>
            <span>Login</span>
            <span>Register</span>
            <span>About</span> 
        </>
    );

    const navLogIn = <span>Log Out</span>

    return (
        <nav className={styles.navigation}>
            <div>
                <img src={logo} alt='logo' />
            </div>
            { isLogIn && navLogIn }
            { !isLogIn && navLogOut }
        </nav>
    );
}

export default Navigation;