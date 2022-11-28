import React, { useReducer } from 'react';
import { auth } from '../../contexts/AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { UserInput, userInputDefaultState } from '../../types/UserInput';

import styles from './Register.module.scss';

const ACTIONS = {
    username: 'Enter_username',
    password: 'Enter_password',
    confirmedPassword: 'Confirm_password',
    oldUsername: 'old_username',
    submit: 'valid', 
    errors: ['invalid_username', 'invalid_password', 'password_not_matched']
};

const reducer = (state: UserInput, action: { type: string, value?: any }) => {
    switch (action.type) {
        case ACTIONS.username: 
            return { ...state, username: action.value, oldUsername: false }
        case ACTIONS.password: 
            return { ...state, password: action.value, oldUsername: false }
        case ACTIONS.confirmedPassword: 
            return { ...state, confirmedPassword: action.value, oldUsername: false }
        case ACTIONS.submit: 
            return { ...state, username: '', password: '', confirmedPassword: '', isTouched: false }
        case ACTIONS.oldUsername:
            return { ...state, username: '', password: '', confirmedPassword: '', isTouched: false, oldUsername: true }
        case ACTIONS.errors[0]: 
            return { ...state, username: '', isTouched: true }
        case ACTIONS.errors[1]: 
            return { ...state, password: '', isTouched: true }
        case ACTIONS.errors[2]: 
            return { ...state, confirmedPassword: '', isTouched: true }
        default:
            return userInputDefaultState;  
    }
}

function Register() {

    const [newState, dispatch] = useReducer(reducer, userInputDefaultState);
    const { username, password, confirmedPassword, oldUsername, isTouched }: UserInput = newState;

    const usernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => { dispatch({ type: ACTIONS.username, value: event.target.value }); };
    const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => { dispatch({ type: ACTIONS.password, value: event.target.value }); };
    const confirmedPasswordHandler = (event: React.ChangeEvent<HTMLInputElement> ) => { dispatch({ type: ACTIONS.confirmedPassword, value: event.target.value }); };

    const isUsernameValid = username.includes('@');
    const regularExpression = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    const isPasswordValid = regularExpression.test(password);
    const isConfirmedPasswordValid: boolean | null = confirmedPassword.match(password) && confirmedPassword.length >= 6;

    const submitHandler = async (event: React.FormEvent) => {
        
        event.preventDefault();

        const data = { username, password, confirmedPassword };

        // console.log(data);

        try {
            // Where all user inputs are valid
            if (isUsernameValid && isPasswordValid && isConfirmedPasswordValid) { 
                await createUserWithEmailAndPassword(auth, username, password);
                dispatch({ type: ACTIONS.submit}); 
            } else {
                // Handling wrong user inputs
                if (!isUsernameValid) dispatch({ type: ACTIONS.errors[0]});
                if (!isPasswordValid) dispatch({ type: ACTIONS.errors[1]});
                if (!isConfirmedPasswordValid) dispatch({ type: ACTIONS.errors[2]});
            }
        } catch {
            // Where there's already an existing email registered.
            dispatch({ type: ACTIONS.oldUsername });
            throw new Error('Unable to create new account.');
        }
    }

    // Feedback to user after each submission
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
    const oldUsernameFeedback =  <p className={styles.invalid}>This email is already registered! Please sign in.</p>;


    return (
        <div>
            <form className={ styles.userForm } onSubmit={ submitHandler }>
                <h2>Please enter your personal details:</h2>
                <div className={ styles.userFormLabel }>
                    <label>Email</label>
                    <input 
                        aria-label='email'
                        type='text' 
                        className={ !isUsernameValid && isTouched ? styles.invalidInput : '' } 
                        value={ username } 
                        onChange={ usernameHandler } 
                        name={ username }
                    />
                </div>
                { !isUsernameValid && isTouched && usernameFeedback }
                <div className={ styles.userFormLabel }>
                    <label>Password</label>
                    <input 
                        aria-label='password'
                        type='text' 
                        className={ !isPasswordValid && isTouched ? styles.invalidInput : '' } 
                        value={ password } 
                        onChange={ passwordHandler } 
                        name={ password } 
                    />
                </div>
                { !isPasswordValid && newState.isTouched && passwordFeedback }
                <div className={ styles.userFormLabel }>
                    <label>Confirm Password</label>
                    <input 
                        aria-label='passwordConfirmation'
                        type='text' 
                        className={ !isConfirmedPasswordValid && isTouched ? styles.invalidInput : '' } 
                        value={ confirmedPassword } 
                        onChange={ confirmedPasswordHandler } 
                        name={ confirmedPassword } 
                    />
                </div>
                { !isConfirmedPasswordValid && isTouched && confirmedPasswordFeedback }
                <div className={ styles.userFormButton }>
                    <p></p>
                    <button aria-label='submit'>Submit</button>
                </div>
                { oldUsername && oldUsernameFeedback }
            </form>
        </div>
    );
}

export default Register;
