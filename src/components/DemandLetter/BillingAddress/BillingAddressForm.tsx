import React , { useReducer, useState }from 'react';
import { useDb } from '../../../contexts/DbContext';
import { addDoc } from 'firebase/firestore';
import { billingAddress, billingAddressDefaultState } from '../../../types/BillingAddress';

import BillingAddressErrors from './BillingAddressErrors';

import styles from './BillingAddressForm.module.scss';

const ACTIONS = {
    billedTo    : 'ENTER_BILLED_TO',
    position    : 'ENTER_POSITION',
    company     : 'ENTER_COMPANY',
    building    : 'ENTER_BUILDING',
    street      : 'ENTER_STREET',
    surburb     : 'ENTER_SURBURB',
    postcode    : 'ENTER_POSTCODE',
    state       : 'ENTER_STATE',
    country     : 'ENTER_COUNTRY',
    reset       : 'RESET'
};

const reducer = (state: billingAddress, action: { type: string, value?: any }) => {
    
    switch (action.type) {
        case ACTIONS.billedTo: 
            return { ...state, billedTo: action.value }
        case ACTIONS.position: 
            return { ...state, position: action.value}
        case ACTIONS.company: 
            return { ...state, company: action.value }
        case ACTIONS.building: 
            return { ...state, building: action.value }
        case ACTIONS.street:
            return { ...state, street: action.value }
        case ACTIONS.surburb: 
            return { ...state, surburb: action.value }
        case ACTIONS.postcode: 
            return { ...state, postcode: action.value }
        case ACTIONS.state: 
            return { ...state, state: action.value }
        case ACTIONS.country:
            return { ...state, country: action.value }
        case ACTIONS.reset:
            return { ...billingAddressDefaultState }
        default:
            return billingAddressDefaultState;  
    }
}


function BillingAddressForm() {

    const [newState, dispatch] = useReducer(reducer, billingAddressDefaultState);
    const { billedTo, position, company, building, street, surburb, postcode, state, country } : billingAddress = newState;

    // States generating error messages where user enters the wrong input
    const [companyError, setCompanyError] = useState<string>('');
    const [streetError, setStreetError] = useState<string>('');
    const [surburbError, setSurburbError] = useState<string>('');
    const [postcodeError, setPostcodeError] = useState<string>('');
    const [stateError, setStateError] = useState<string>('');

    // Checking whether form is submitted or not
    const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

    const userInputs = [{
            label: 'Billed To',
            state: billedTo,
            handler: (event: React.ChangeEvent<HTMLInputElement>) => { dispatch({ type: ACTIONS.billedTo, value: event.target.value }) },
        }, {
            label: 'Position',
            state: position,
            handler: (event: React.ChangeEvent<HTMLInputElement>) => { dispatch({ type: ACTIONS.position, value: event.target.value }) },
        }, {
            label: 'Company Name*',
            state: company,
            handler: (event: React.ChangeEvent<HTMLInputElement>) => { 
                setCompanyError('');
                dispatch({ type: ACTIONS.company, value: event.target.value }) 
                },
        }, {
            label: 'Building Name',
            state: building,
            handler: (event: React.ChangeEvent<HTMLInputElement>) => { dispatch({ type: ACTIONS.building, value: event.target.value }) },
        }, {
            label: 'Street Address*',
            state: street,
            handler: (event: React.ChangeEvent<HTMLInputElement>) => { 
                setStreetError('');
                dispatch({ type: ACTIONS.street, value: event.target.value }) 
                },
        }, {
            label: 'Surburb*',
            state: surburb,
            handler: (event: React.ChangeEvent<HTMLInputElement>) => { 
                setSurburbError('');
                dispatch({ type: ACTIONS.surburb, value: event.target.value }) 
                },
        }, {
            label: 'Postcode*',
            state: postcode,
            handler: (event: React.ChangeEvent<HTMLInputElement>) => { 
                setPostcodeError('');
                dispatch({ type: ACTIONS.postcode, value: event.target.value }) 
                },
        }, {
            label: 'State*',
            state: state,
            handler: (event: React.ChangeEvent<HTMLInputElement>) => { 
                setStateError('');
                dispatch({ type: ACTIONS.state, value: event.target.value }) 
                },
        }, {
            label: 'Country',
            state: country,
            handler: (event: React.ChangeEvent<HTMLInputElement>) => { dispatch({ type: ACTIONS.country, value: event.target.value }) },
        }];

    const { billAddressColRef } = useDb();

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (company === '' || street === '' || surburb === '' || postcode === '' || state === '') {
            setIsFormSubmitted(true);
            return;
        }
        addDoc(billAddressColRef, {
            billedTo,
            position,
            company,
            building, 
            street, 
            surburb, 
            postcode,
            state,
            country 
        })
        .then(() => {
            // console.log({ billedTo, position, company, building, street, surburb, postcode, state, country });
            setIsFormSubmitted(false);
            dispatch({ type: ACTIONS.reset });
        })
    }

    // Passing dataErrors to BillingAddressErrors component
    const dataErrors = { setCompanyError, setStreetError, setSurburbError, setPostcodeError, setStateError, setIsFormSubmitted };
    const setErrors = (data: any) => data;

    const closeHandler = () => setIsFormSubmitted(false);

    return (
        <>
        { isFormSubmitted && 
            <BillingAddressErrors 
                company={company} 
                street={street} 
                surburb={surburb} 
                postcode={postcode} 
                state={state}
                errors={{ company: companyError, street: streetError, surburb: surburbError, postcode: postcodeError, state: stateError }}
                setErrors={setErrors(dataErrors)}
            /> }
        <form aria-label='billingAddress' id={styles.billingAddressForm} onSubmit={submitHandler} onClick={closeHandler}>
            { userInputs.map((userInput) => {
                return (
                    <div key={ userInput.label } className={styles.billingAddressContainer}>
                        <label>{ userInput.label }</label>
                        <input type='text' value={ userInput.state } name={ userInput.label } onChange={ userInput.handler} />
                    </div>
                );
            }) }
            <button>Submit</button>
        </form>
        </>
    );
}

export default BillingAddressForm;