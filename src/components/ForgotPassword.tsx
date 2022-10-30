import React, { useState } from 'react';

import styles from './ForgotPassword.module.scss';
import { auth } from 'src/contexts/AuthContext';
import { sendPasswordResetEmail } from 'firebase/auth';

function ForgotPassword() {

    const [enteredEmail, setEnteredEmail] = useState<string>('');
    const [isTouched, setIsTouched] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);


    const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredEmail(event.target.value);
        setIsTouched(false);
        setIsSubmitted(false);
    }

    const isEmailValid: boolean = enteredEmail.includes('@');

    const submitHandler = async (event: React.FormEvent) => {
        
        event.preventDefault();
        setIsSubmitted(false);

        await sendPasswordResetEmail(auth, enteredEmail)
        .then(() => {
            setEnteredEmail('');
            setIsTouched(false);
            setIsSubmitted(true);
            console.log(enteredEmail);
        })
        .catch((err) => {
            setEnteredEmail('');
            setIsTouched(true);
            console.log(err);
        })
    }

    return (
        <form className={styles.userForm} onSubmit={submitHandler}>
            <label>What's your email address?</label>
            <input 
                id={styles.forgotPasswordInput}
                onChange={emailHandler} 
                type='text' 
                value={ enteredEmail }
                className={ !isEmailValid && isTouched ? styles.invalidInput : '' } 
            />
            { isTouched && <p className={styles.invalid}>Username not found.</p>}
            { isSubmitted && <p>Email received. Please check your inbox.</p>}
            <div className={ styles.userFormButton }>
                <p></p>
                <button>Reset Password</button>
            </div>
        </form>
    );
}

export default ForgotPassword;

