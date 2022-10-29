import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import styles from './Navigation.module.scss';
import logo from '../images/logo.PNG';

function Navigation() {

    const { isLogIn, isLogInHandler} = useAuth();

    const navLogIn = (
        <>
            <span><Link to='/login'>Login</Link></span>
            <span><Link to='/register'>Register</Link></span>
            <span><Link to='/About'>About</Link></span> 
        </>
    );

    const logOutHandler = () => {
        isLogInHandler(false);
    }

    const navLogOut = <span onClick={logOutHandler}><Link to='/'>Log Out</Link></span>



    return (
        <nav className={styles.navigation}>
            <div>
                <img src={logo} alt='logo' />
            </div>
            { isLogIn && navLogOut }
            { !isLogIn && navLogIn }
        </nav>
    );
}

export default Navigation;