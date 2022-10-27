import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Login.module.scss';

function Login() {

    const [enteredUsername, setUsername] = useState<string>('');
    const [enteredPassword, setPassword] = useState<string>('');
    const [isTouched, setIsTouched] = useState<boolean>(false);

    const usernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const isUsernameValid: boolean = enteredUsername.includes('@');
    const regularExpression: RegExp = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    const isPasswordValid: boolean = regularExpression.test(enteredPassword);

    const submitHandler = (event: React.FormEvent) => {
        
        event.preventDefault();
        console.log({ username: enteredUsername, password: enteredPassword });

        setIsTouched(true);
    
        if (isUsernameValid && isPasswordValid) {
            setUsername('');
            setPassword('');
            setIsTouched(false);
        } else {
            setPassword('');
            throw new Error('Invalid username and password.');
        }
    };

    const usernameFeedback = <p className={styles.invalid} >Please enter a valid email.</p>;

    const passwordFeedback = (
                        <div className={styles.invalid}>
                            Password must be:
                            <ul>
                                <li>8 to 16 characters long; &</li>
                                <li>has at least 1 alphabet, 1 number and 1 special character.</li>
                            </ul>
                        </div>
                        );

    return (
        <form  className={ styles.userForm } onSubmit={ submitHandler }>
            <h2>Login</h2>
            <div className={ styles.userFormLabel }>
                <label>Username</label>
                <input type='text' className={ !isUsernameValid && isTouched ? styles.invalidInput : '' } value={ enteredUsername } onChange={ usernameHandler }/>
            </div>
            { !isUsernameValid && isTouched && usernameFeedback }
            <div className={ styles.userFormLabel }>
                <label>Password</label>
                <input type='text' className={ !isPasswordValid && isTouched ? styles.invalidInput : '' } value={ enteredPassword } onChange={ passwordHandler }/>
            </div>
            { !isPasswordValid && isTouched && passwordFeedback }
            <div className={ styles.userFormButton }>
                <p>New? <Link to='/register'>Register now</Link></p>
                <button>Login</button>
            </div>
        </form>
    );

}

export default Login;