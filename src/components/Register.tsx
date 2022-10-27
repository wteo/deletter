import React, { useReducer } from 'react';

import styles from './Register.module.scss';

type UserInput = {
    username: string,
    password: string, 
    confirmedPassword: string,
    isTouched: boolean,
    isSubmitted: boolean
};

const defaultState: UserInput = {
    username            : '',
    password            : '',
    confirmedPassword   : '',
    isTouched           : false,
    isSubmitted         : false
};

const ACTIONS = {
    username: 'Enter_username',
    password: 'Enter_password',
    confirmedPassword: 'Confirm_password',
    submit: 'valid', 
    errors: ['invalid_username', 'invalid_password', 'password_not_matched']
};

const reducer = (state: UserInput, action: { type: string, value?: any }) => {
    switch (action.type) {
        case ACTIONS.username: 
            return { ...state, username: action.value }
        case ACTIONS.password: 
            return { ...state, password: action.value }
        case ACTIONS.confirmedPassword: 
            return { ...state, confirmedPassword: action.value }
        case ACTIONS.submit: 
            return { username: '', password: '', confirmedPassword: '', isTouched: false, isSubmitted: true }
        case ACTIONS.errors[0]: 
            return { ...state, username: '', isTouched: true }
        case ACTIONS.errors[1]: 
            return { ...state, password: '', isTouched: true }
        case ACTIONS.errors[2]: 
            return { ...state, confirmedPassword: '', isTouched: true }
        default:
            return defaultState;  
    }
}

function Register() {

    const [newState, dispatch] = useReducer(reducer, defaultState);
    const { username, password, confirmedPassword, isTouched, isSubmitted }: UserInput = newState;

    const usernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => { dispatch({ type: ACTIONS.username, value: event.target.value }); };
    const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => { dispatch({ type: ACTIONS.password, value: event.target.value }); };
    const confirmedPasswordHandler = (event: React.ChangeEvent<HTMLInputElement> ) => { dispatch({ type: ACTIONS.confirmedPassword, value: event.target.value }); };

    const isUsernameValid = username.includes('@');
    const regularExpression = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    const isPasswordValid = regularExpression.test(password);
    const isConfirmedPasswordValid: boolean | null = confirmedPassword.match(password) && confirmedPassword.length >= 6;

    const submitHandler = (event: React.FormEvent) => {
        
        event.preventDefault();

        const data = { username, password, confirmedPassword };

        console.log(data);

        // Handling wrong user inputs
        if (!isUsernameValid) dispatch({ type: ACTIONS.errors[0]});
        if (!isPasswordValid) dispatch({ type: ACTIONS.errors[1]});
        if (!isConfirmedPasswordValid) dispatch({ type: ACTIONS.errors[2]});

        // Where all user inputs are valid
        if (isUsernameValid && isPasswordValid && isConfirmedPasswordValid) { 

            fetch('https://deletter-7762f-default-rtdb.asia-southeast1.firebasedatabase.app/users.json', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            .then((res: { status: number } ) => { 
                try {
                    if (res.status === 200) {
                        console.log('New account created!');
                    }
                } catch(err: any) {
                    throw new Error(err.message);
                }
             })
            .catch((err: string) => { 
                throw new Error(err);
            });

            dispatch({ type: ACTIONS.submit}); 
        }

        return;
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
    const accountCreated = <p id={styles.accountCreated}>Your account has been created.</p> 

    return (
        <div>
            <form className={ styles.userForm } onSubmit={ submitHandler }>
                <h2>Please enter your personal details:</h2>
                <div className={ styles.userFormLabel }>
                    <label>Email</label>
                    <input 
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
                    <button>Submit</button>
                </div>
                { isSubmitted && accountCreated }
            </form>
        </div>
    );
}

export default Register;
