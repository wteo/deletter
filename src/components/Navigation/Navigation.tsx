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
            <Link to='/login'><span>Login</span></Link>
            <Link to='/register'><span>Register</span></Link>
            <Link to='/about'><span>About</span></Link>
        </>
    );

    const navLogOut = (
        <>
            <span onClick={logOutHandler}>Log Out</span>
            <span>Account
                <div>
                    <ul className={styles.dropdownMenu}>
                        <Link to='/account/customers'><li>Customers</li></Link>
                        <Link to='/account/invoices'><li>Invoices</li></Link>
                    </ul>
                </div> 
            </span>
            <span>Create New
                <div>
                    <ul className={styles.dropdownMenu}>
                        <Link to='/form/customer'><li>Customer</li></Link>
                        <Link to='/form/invoice'><li>Invoice</li></Link>
                        <Link to='/form/letter'><li>Letter</li></Link>
                        <Link to='/form/signature'><li>Signature</li></Link>
                    </ul>
                </div> 
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