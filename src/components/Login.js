import React, { useState } from 'react';

import styles from './Login.module.scss';

function Login() {

    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const usernameHandler = (event) => {
        setEnteredUsername(event.target.value);
    };

    const passwordHandler = (event) => {
        setEnteredPassword(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        console.log({ username: enteredUsername, password: enteredPassword });
        setEnteredUsername('');
        setEnteredPassword('');
    };

    return (
        <>
            <form  id={styles.login} onSubmit={ submitHandler }>
                <div className={styles.loginInput}>
                    <label>Username</label>
                    <input type='text' value={ enteredUsername } onChange={ usernameHandler }/>
                </div>
                <div className={styles.loginInput}>
                    <label>Password</label>
                    <input type='text' value={ enteredPassword } onChange={ passwordHandler }/>
                </div>
                <div className={styles.loginButton}>
                    <p>New to DeLetter? Register</p>
                    <button>Login</button>
                </div>
            </form>
        </>
    );

}

export default Login;