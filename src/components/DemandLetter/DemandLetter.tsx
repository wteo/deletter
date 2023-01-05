import React from 'react';

import styles from './DemandLetter.module.scss';

import BillingAddressForm from './BillingAddress/BillingAddressForm';
import LetterTemplate from './LetterTemplate/LetterTemplate';
import Invoices from './Invoices/Invoices';

function DemandLetter() {
    return (
        <div id={styles.demandLetter}>
            <BillingAddressForm />
            <LetterTemplate />
            <Invoices />
        </div>
        );
}

export default DemandLetter;