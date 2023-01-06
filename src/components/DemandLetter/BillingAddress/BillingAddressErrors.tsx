import React, { useEffect } from 'react';

import style from './BillingAddressErrors.module.scss';

type props = {
    company: string,
    street: string, 
    surburb: string,
    postcode: string,
    state: string,
    errors: { company: string, street: string, surburb: string, postcode: string, state: string },
    setErrors: any,
    }

function BillingAddressErrors(props: props) {

    const { setCompanyError, setStreetError, setSurburbError, setPostcodeError, setStateError, setIsFormSubmitted } = props.setErrors;
    
    useEffect(() => {
        // Conditions when creating new Customer / Billing Address
        // Error messages when user gives the wrong input
        const companyErrorMessage: string = 'Company';
        const streetErrorMessage: string = 'Street';
        const surburbErrorMessage: string = 'Surburb';
        const postcodeErrorMessage: string = 'Postcode';
        const stateErrorMessage: string = 'State';

        // Conditions when entering values to each input
        const companyCondition: boolean = props.company === '';
        const streetCondition: boolean = props.street === '';
        const surburbCondition: boolean = props.surburb === '';
        const postcodeCondition: boolean = props.postcode === '';
        const stateCondition: boolean = props.state === '';

        switch(true) {
            // where there are 5 errors
            case companyCondition && streetCondition && surburbCondition && postcodeCondition && stateCondition:
                setCompanyError(companyErrorMessage);
                setStreetError(streetErrorMessage);
                setSurburbError(surburbErrorMessage);
                setPostcodeError(postcodeErrorMessage);
                setStateError(stateErrorMessage);
                return;
            // where there are 4 errors - has 5 variations
            // variation 1
            case companyCondition && streetCondition && surburbCondition && postcodeCondition:
                setCompanyError(companyErrorMessage);
                setStreetError(streetErrorMessage);
                setSurburbError(surburbErrorMessage);
                setPostcodeError(postcodeErrorMessage);
                return;
            // variation 2
            case companyCondition && streetCondition && surburbCondition && stateCondition:
                setCompanyError(companyErrorMessage);
                setStreetError(streetErrorMessage);
                setSurburbError(surburbErrorMessage);
                setStateError(stateErrorMessage);
                return;
            // variation 3
            case companyCondition && streetCondition && postcodeCondition && stateCondition: 
                setCompanyError(companyErrorMessage)    
                setStreetError(streetErrorMessage);
                setPostcodeError(postcodeErrorMessage);
                setStateError(stateErrorMessage);
                return;
            // variation 4
            case companyCondition && surburbCondition && postcodeCondition && stateCondition:
                setCompanyError(companyErrorMessage);
                setSurburbError(surburbErrorMessage);
                setPostcodeError(postcodeErrorMessage);
                setStateError(stateErrorMessage);
                return;
            // variation 5
            case streetCondition && surburbCondition && postcodeCondition && stateCondition:
                setStreetError(streetErrorMessage);
                setSurburbError(surburbErrorMessage);
                setPostcodeError(postcodeErrorMessage);
                setStateError(stateErrorMessage);
                return;
            // where there are 3 errors - has 10 variations
            // variation 1
            case companyCondition && streetCondition && surburbCondition:
                setCompanyError(companyErrorMessage);
                setStreetError(streetErrorMessage);
                setSurburbError(surburbErrorMessage);
                return;
            // variation 2
            case companyCondition && streetCondition && postcodeCondition:
                setCompanyError(companyErrorMessage);
                setStreetError(streetErrorMessage);
                setPostcodeError(postcodeErrorMessage);
                return;
            // variation 3
            case companyCondition && streetCondition && stateCondition:
                setCompanyError(companyErrorMessage);
                setStreetError(streetErrorMessage);
                setStateError(stateErrorMessage);
                return;
            // variation 4
            case companyCondition && surburbCondition && postcodeCondition:
                setCompanyError(companyErrorMessage);
                setSurburbError(surburbErrorMessage);
                setPostcodeError(postcodeErrorMessage);
                return;
            // variation 5
            case companyCondition && surburbCondition && stateCondition:
                setCompanyError(companyErrorMessage);
                setSurburbError(surburbErrorMessage);
                setStateError(stateErrorMessage);
                return;
            // variation 6
            case companyCondition && postcodeCondition && stateCondition:
                setCompanyError(companyErrorMessage);
                setPostcodeError(postcodeErrorMessage);
                setStateError(stateErrorMessage);
                return;
            // variation 7
            case streetCondition && surburbCondition && postcodeCondition:
                setStreetError(streetErrorMessage);
                setSurburbError(surburbErrorMessage);
                setPostcodeError(postcodeErrorMessage);
                return;
            // variation 8
            case streetCondition && surburbCondition && stateCondition:
                setStreetError(streetErrorMessage);
                setSurburbError(surburbErrorMessage);
                setStateError(stateErrorMessage);
                return;
            // variation 9
            case streetCondition && postcodeCondition && stateCondition:
                setStreetError(streetErrorMessage);
                setPostcodeError(postcodeErrorMessage);
                setStateError(stateErrorMessage);
                return;
            // variation 10
            case surburbCondition && postcodeCondition && stateCondition:
                setSurburbError(surburbErrorMessage);
                setPostcodeError(postcodeErrorMessage);
                setStateError(stateErrorMessage);
                return;
            // where there are 2 errors - has 10 variations
            // variation 1
            case companyCondition && streetCondition:
                setCompanyError(companyErrorMessage);
                setStreetError(streetErrorMessage);
                return;
            // variation 2
            case companyCondition && surburbCondition:
                setCompanyError(companyErrorMessage);
                setSurburbError(surburbErrorMessage);
                return;
            // variation 3
            case companyCondition && postcodeCondition:
                setCompanyError(companyErrorMessage);
                setPostcodeError(postcodeErrorMessage);
                return;
            // variation 4
            case companyCondition && stateCondition:
                setCompanyError(companyErrorMessage);
                setStateError(stateErrorMessage);
                return;
            // variation 5
            case streetCondition && surburbCondition:
                setStreetError(streetErrorMessage);
                setSurburbError(surburbErrorMessage);
                return;
            // variation 6
            case streetCondition && postcodeCondition:
                setStreetError(streetErrorMessage);
                setPostcodeError(postcodeErrorMessage);
                return;
            // variation 7
            case streetCondition && stateCondition:
                setStreetError(streetErrorMessage);
                setStateError(stateErrorMessage);
                return;
            // variation 8
            case surburbCondition && postcodeCondition:
                setSurburbError(surburbErrorMessage);
                setPostcodeError(postcodeErrorMessage);
                return;
            // variation 9
            case surburbCondition && stateCondition:
                setSurburbError(surburbErrorMessage);
                setStateError(stateErrorMessage);
                return;
            // variation 10
            case postcodeCondition && stateCondition:
                setPostcodeError(postcodeErrorMessage);
                setStateError(stateErrorMessage);
                return;
            // Where there is only 1 error
            case companyCondition:
                setCompanyError(companyErrorMessage);
                return;
            case streetCondition:
                setStreetError(streetErrorMessage);
                return;
            case surburbCondition:
                setSurburbError(surburbErrorMessage);
                return;
            case postcodeCondition:
                setPostcodeError(postcodeErrorMessage);
                return;
            case stateCondition:
                setStateError(stateErrorMessage);
                return;
            default:
                break;
        }
    }, 
    // eslint-disable-next-line
    []);

    const closeHandler = () => {
        setIsFormSubmitted(false);
    };

    const { company, street, surburb, postcode, state } = props.errors;
    const errorMessages = [company, street, surburb, postcode, state];
    
    return (
        <div id={style.billingAddressErrorMessage}>
            <button onClick={closeHandler}>X</button>
            <h4>Missing details. Please enter:</h4>
            { errorMessages.map((errorMessage: string) => <p data-testid="errMessage">{errorMessage}</p>)}
        </div>
    );

}

export default BillingAddressErrors;