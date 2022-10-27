import React, { useReducer } from 'react';

import styles from './Register.module.scss';

type UserInput = {
    username: string,
    password: string, 
    confirmedPassword: string,
    isTouched: boolean
};

const defaultState: UserInput = {
    username            : '',
    password            : '',
    confirmedPassword   : '',
    isTouched           : false
};

const ACTIONS = {
    username: 'Enter_username',
    password: 'Enter_password',
    confirmedPassword: 'Confirm_password',
    submit: ['valid', 'invalid_username', 'invalid_password', 'password_not_matched']
};

const reducer = (state: UserInput, action: { type: string, value?: any }) => {
    switch (action.type) {
        case ACTIONS.username: 
            return { ...state, username: action.value }
        case ACTIONS.password: 
            return { ...state, password: action.value }
        case ACTIONS.confirmedPassword: 
            return { ...state, confirmedPassword: action.value }
        case ACTIONS.submit[0]: 
            return { username: '', password: '', confirmedPassword: '', isTouched: false }
        case ACTIONS.submit[1]: 
            return { ...state, username: '', isTouched: true }
        case ACTIONS.submit[2]: 
            return { ...state, password: '', isTouched: true }
        case ACTIONS.submit[3]: 
            return { ...state, confirmedPassword: '', isTouched: true }
        default:
            return defaultState;  
    }
}

function Register() {

    const [newState, dispatch] = useReducer(reducer, defaultState);
    const { username, password, confirmedPassword, isTouched }: UserInput = newState;

    const usernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => { dispatch({ type: ACTIONS.username, value: event.target.value }); };
    const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => { dispatch({ type: ACTIONS.password, value: event.target.value }); };
    const confirmedPasswordHandler = (event: React.ChangeEvent<HTMLInputElement> ) => { dispatch({ type: ACTIONS.confirmedPassword, value: event.target.value }); };

    const isUsernameValid: boolean = username.includes('@');
    const regularExpression: RegExp = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    const isPasswordValid: boolean = regularExpression.test(password);
    const isConfirmedPasswordValid: boolean | null = confirmedPassword.match(password) && confirmedPassword.length >= 6;

    const submitHandler = (event: React.FormEvent) => {
        
        event.preventDefault();

        const data:{ username: string, password: string, confirmedPassword: string } = { username, password, confirmedPassword };
        console.log(data);

        // Handling wrong user inputs
        if (!isUsernameValid) dispatch({ type: ACTIONS.submit[1]});
        if (!isPasswordValid) dispatch({ type: ACTIONS.submit[2]});
        if (!isConfirmedPasswordValid) dispatch({ type: ACTIONS.submit[3]});

        if (isUsernameValid && isPasswordValid && isConfirmedPasswordValid) { 

            /*
            fetch('../users.json', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))
            */

            dispatch({ type: ACTIONS.submit[0]}); 
        }

        return;
    }

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
            </form>
        </div>
    );
}

export default Register;
