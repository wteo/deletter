import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth, useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';

import styles from './Navigation.module.scss';
import logo from '../images/logo.png';

function Navigation() {

    const { currentUser } = useAuth();
    const navigation = useNavigate();

    const logOutHandler = async () => {
        await signOut(auth)
        .then(() => {
            navigation('/login');

        })
        .catch((error: string) => {
            alert(`${error} Unable to logout`);
        })

    }

    const navLogIn = (
        <>
            <span><Link to='/login'>Login</Link></span>
            <span><Link to='/register'>Register</Link></span>
            <span><Link to='/About'>About</Link></span> 
        </>
    );

    const navLogOut = <span onClick={logOutHandler}>Log Out</span>

    return (
        <nav className={styles.navigation}>
            <div>
                <img src={logo} alt='logo' />
            </div>
            { currentUser && navLogOut }
            { !currentUser && navLogIn }
        </nav>
    );
}

export default Navigation;