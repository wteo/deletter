import React, { useState } from 'react';

import styles from './Register.module.scss';

function Register() {

    const [enteredUsername, setUsername] = useState('');
    const [enteredPassword, setPassword] = useState('');
    const [enteredConfirmedPasssword, setConfirmedPassword] = useState('');

    const usernameHandler = (event) => {
        setUsername(event.target.value);
    };

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    };

    const confirmedPasswordHandler = (event) => {
        setConfirmedPassword(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        console.log({ username: enteredUsername, password: enteredPassword, confirmedPassword: enteredConfirmedPasssword });
        setUsername('');
        setPassword('');
        setConfirmedPassword('');
    };

    return (
        <div>
            <form className={ styles.userForm } onSubmit={ submitHandler }>
                <p>Please enter your personal details:</p>
                <div className={ styles.userFormLabel }>
                    <label>Email</label>
                    <input type='text' value={ enteredUsername } onChange={ usernameHandler } />
                </div>
                <div className={ styles.userFormLabel }>
                    <label>Password</label>
                    <input type='text' value={ enteredPassword } onChange={ passwordHandler } />
                </div>
                <div className={ styles.userFormLabel }>
                    <label>Confirm Password</label>
                    <input type='text' value={ enteredConfirmedPasssword } onChange={ confirmedPasswordHandler } />
                </div>
                <div className={ styles.userFormButton }>
                    <p></p>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
