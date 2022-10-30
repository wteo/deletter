import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from 'src/contexts/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';

import styles from './Login.module.scss';

function Login() {

    const [enteredUsername, setUsername] = useState<string>('');
    const [enteredPassword, setPassword] = useState<string>('');
    
    // Handling Errors
    const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true);
    const [isPasswordValid, setisPasswordValid] = useState<boolean>(true);
    const [hasAccountLocked, setHasAccountLocked] = useState<boolean>(false);
    const [miscError, setMiscError] = useState<boolean>(false);

    const usernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsUsernameValid(true);
        setHasAccountLocked(false);
        setMiscError(false);
        setUsername(event.target.value);
    };

    const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setisPasswordValid(true);
        setHasAccountLocked(false);
        setMiscError(false);
        setPassword(event.target.value);
    };

    const navigation = useNavigate();

    const submitHandler = async (event: React.FormEvent) => {
        
        event.preventDefault();

            await signInWithEmailAndPassword(auth, enteredUsername, enteredPassword)
                .then((userCredential) => {
                    const user = userCredential.user;
                    // Need to specify feedback on username and password
                    console.log(user);
                    navigation('/dashboard');
                })
                .catch(err => {
                    if (err.code === 'auth/invalid-email' || err.code === 'auth/user-not-found') {
                        setUsername('');
                        setPassword('');
                        setIsUsernameValid(false);
                    }
                    if (err.code === 'auth/wrong-password') {
                        setPassword('');
                        setisPasswordValid(false);
                    }
                    if (err.code === 'auth/too-many-requests') {
                        setUsername('');
                        setPassword('');
                        setHasAccountLocked(true);
                    }
                    if (err.code === 'auth/internal-error') {
                        setUsername('');
                        setPassword('');
                        setMiscError(true);
                    }
                    console.log(err.code, err.message)
                    return;
                });
    };

    return (
        <>
        <form  className={ styles.userForm } onSubmit={ submitHandler }>
            <h2>Login</h2>
            <div className={ styles.userFormLabel }>
                <label>Username</label>
                <input type='text' className={ !isUsernameValid ? styles.invalidInput : '' } value={ enteredUsername } onChange={ usernameHandler }/>
            </div>
            { !isUsernameValid && <p className={styles.invalid}>Invalid or missing email.</p> }
            <div className={ styles.userFormLabel }>
                <label>Password</label>
                <input type='text' className={ !isPasswordValid ? styles.invalidInput : '' } value={ enteredPassword } onChange={ passwordHandler }/>
            </div>
            { !isPasswordValid && <p className={styles.invalid}>Invalid password.</p> }
            { hasAccountLocked && <p className={styles.invalid}>Too many failed attempts. Access to this account has been temporarily disabled.</p> }
            { miscError && <p className={styles.invalid}>Unable to login. Please try again later.</p>}
            <div className={ styles.userFormButton }>
                <p>New? <Link to='/register'>Register now</Link></p>
                <button>Login</button>
            </div>
        </form>
        <p id={styles.forgottenPassword}><Link to='./password'>Forgot your password?</Link></p>
        </>
    );

}

export default Login;