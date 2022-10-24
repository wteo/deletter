import React, { useState } from 'react';

import styles from './Login.module.scss';

function Login() {

    const [enteredUsername, setUsername] = useState('');
    const [enteredPassword, setPassword] = useState('');

    const usernameHandler = (event) => {
        setUsername(event.target.value);
    };

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        console.log({ username: enteredUsername, password: enteredPassword });
        setUsername('');
        setPassword('');
    };

    return (
        <form  className={ styles.userForm } onSubmit={ submitHandler }>
            <div className={ styles.userFormLabel }>
                <label>Username</label>
                <input type='text' value={ enteredUsername } onChange={ usernameHandler }/>
            </div>
            <div className={ styles.userFormLabel }>
                <label>Password</label>
                <input type='text' value={ enteredPassword } onChange={ passwordHandler }/>
            </div>
            <div className={ styles.userFormButton }>
                <p>New to DeLetter? Register</p>
                <button>Login</button>
            </div>
        </form>
    );

}

export default Login;