import React, { useReducer, useState } from 'react';
import { useDb } from '../../contexts/DbContext';
import { addDoc } from 'firebase/firestore';

// Typing
import { signature, signatureDefaultState } from '../../types/Signature';

import styles from './SignatureForm.module.scss';

const ACTIONS = {
    signedName      : 'ENTER_NAME',
    signedPosition  : 'ENTER_POSITION',
    phone           : 'ENTER_PHONE',
    signedCompany   : 'ENTER_COMPANY',
    email           : 'ENTER_EMAIL',
    reset           : 'RESET'
};

const reducer = (state: signature, action: { type: string, value?: any }) => {
    switch (action.type) {
        case ACTIONS.signedName: 
            return { ...state, signedName: action.value }
        case ACTIONS.signedPosition: 
            return { ...state, signedPosition: action.value}
        case ACTIONS.signedCompany: 
            return { ...state, signedCompany: action.value }
        case ACTIONS.phone: 
            return { ...state, phone: action.value }
        case ACTIONS.email: 
            return { ...state, email: action.value }
        case ACTIONS.reset:
            return { ...signatureDefaultState }
        default:
            return signatureDefaultState;  
    }
}


function SignatureForm() {

    const { signatureColRef } = useDb();

    // State for Signature
    const [newState, dispatch] = useReducer(reducer, signatureDefaultState);
    const { signedName, signedPosition, signedCompany, phone, email } : signature = newState;

    // Handling error
    const [nameError, setNameError] = useState<string>('');

    const changeHandlers = {
        signedName      : (event: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch({ type: ACTIONS.signedName, value: event.target.value });
                                setNameError('');
                                },
        signedPosition  : (event: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: ACTIONS.signedPosition, value: event.target.value }),
        signedCompany   : (event: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: ACTIONS.signedCompany, value: event.target.value }),
        phone           : (event: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: ACTIONS.phone, value: event.target.value }),
        email           : (event: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: ACTIONS.email, value: event.target.value }),
    };

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        // Condition when submitting new signature
        if (signedName === '') {
            setNameError('Please enter name.');
            return;
        }
        // Where conditions are all met, new signature will be created and added to DB.       
        addDoc(signatureColRef, { signedName, signedPosition, signedCompany, phone, email })
        .then(() => {
            // console.log({ signedName, signedPosition, phone, email });
            setIsConfirmedSuccess(true);
            dispatch({ type: ACTIONS.reset });
        })
    }

    // Feedback whether form has been successfully submitted
    const [IsConfirmedSuccess, setIsConfirmedSuccess] = useState<boolean>(false);
    const clickHandler = () => setIsConfirmedSuccess(false);

    return (
        <>
        { IsConfirmedSuccess && <p className={styles.confirmedSuccess}>New signature has been successfully created.</p> }
        <h2>Enter Signature Details</h2>
        <form id={styles.signatureForm} onSubmit={submitHandler} onClick={clickHandler}>
            <div className={styles.signatureContainer}>
                <label>Name*</label>
                <input type="text" name="signedName" value={signedName} onChange={changeHandlers.signedName} />
                <p>{nameError}</p>
            </div>
            <div className={styles.signatureContainer}>
                <label>Position</label>
                <input type="text" name="signedPosition" value={signedPosition} onChange={changeHandlers.signedPosition} />
            </div>
            <div className={styles.signatureContainer}>
                <label>Company</label>
                <input type="text" name="company" value={signedCompany} onChange={changeHandlers.signedCompany} />
            </div>
            <div className={styles.signatureContainer}>
                <label>Phone</label>
                <input type="text" name="phone" value={phone} onChange={changeHandlers.phone} />
            </div>
            <div className={styles.signatureContainer}>
                <label>Email</label>
                <input type="text" name="email" value={email} onChange={changeHandlers.email} />
            </div>
            <button>Submit</button>
        </form>
        </>
        );
}

export default SignatureForm;