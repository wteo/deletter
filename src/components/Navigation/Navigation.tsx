import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth, useAuth } from '../../contexts/AuthContext';
import { signOut } from 'firebase/auth';

import styles from './Navigation.module.scss';
import logo from '../../images/logo.png';

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
            <span><Link to='/about'>About</Link></span> 
        </>
    );

    const navLogOut = (
        <>
            <span onClick={logOutHandler}>Log Out</span>
            <span><Link to='/customers'>Customers</Link></span>
            <span><Link to='/letter'>Create New</Link></span>
            <span>
                <Link to='/form'>Form
                <div>
                    <ul className={styles.dropdownMenu}>
                        <li><Link to='/form/customer'>Customer</Link></li>
                        <li><Link to='/form/invoice'>Invoice</Link></li>
                        <li><Link to='/form/letter'>Letter</Link></li>
                        <li><Link to='/form/signature'>Signature</Link></li>
                    </ul>
                </div>
                </Link>
            </span>
        </>
    );

    return (
        <nav className={styles.navigation}>
            <div>
                <Link to='/dashboard'>
                    <img src={logo} alt='logo' />
                </Link>
            </div>
            { currentUser && navLogOut }
            { !currentUser && navLogIn }
        </nav>
    );
}

export default Navigation;