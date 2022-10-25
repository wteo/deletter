import React, { useState } from 'react';

import styles from './Register.module.scss';

function Register() {

    const [enteredUsername, setUsername] = useState('');
    const [enteredPassword, setPassword] = useState('');
    const [enteredConfirmedPasssword, setConfirmedPassword] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const usernameHandler = (event) => {
        setUsername(event.target.value);
    };

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    };

    const confirmedPasswordHandler = (event) => {
        setConfirmedPassword(event.target.value);
    };

    const isUsernameValid = enteredUsername.includes('@');
    const regularExpression = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    const isPasswordValid = regularExpression.test(enteredPassword);
    const isConfirmedPasswordValid = enteredConfirmedPasssword.match(enteredPassword) && enteredConfirmedPasssword.length >= 6;

    const submitHandler = (event) => {
        
        event.preventDefault();
        console.log({ username: enteredUsername, password: enteredPassword, confirmedPassword: enteredConfirmedPasssword });
        
        setIsTouched(true);

        if (isUsernameValid && isPasswordValid && isConfirmedPasswordValid) {
            setUsername('');
            setPassword('');
            setConfirmedPassword('');
            setIsTouched(false);
        } else {
            setPassword('');
            setConfirmedPassword('');
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


    const confirmedPasswordFeedback = <p className={styles.invalid}>Password does not match!</p>;

    return (
        <div>
            <form className={ styles.userForm } onSubmit={ submitHandler }>
                <p>Please enter your personal details:</p>
                <div className={ styles.userFormLabel }>
                    <label>Email</label>
                    <input type='text' className={ !isUsernameValid && isTouched ? styles.invalidInput : '' } value={ enteredUsername } onChange={ usernameHandler } />
                </div>
                { !isUsernameValid && isTouched && usernameFeedback }
                <div className={ styles.userFormLabel }>
                    <label>Password</label>
                    <input type='text' className={ !isPasswordValid && isTouched ? styles.invalidInput : '' } value={ enteredPassword } onChange={ passwordHandler } />
                </div>
                { !isPasswordValid && isTouched && passwordFeedback }
                <div className={ styles.userFormLabel }>
                    <label>Confirm Password</label>
                    <input type='text' className={ !isConfirmedPasswordValid && isTouched ? styles.invalidInput : '' } value={ enteredConfirmedPasssword } onChange={ confirmedPasswordHandler } />
                </div>
                { !isConfirmedPasswordValid && isTouched && confirmedPasswordFeedback }
                <div className={ styles.userFormButton }>
                    <p></p>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
