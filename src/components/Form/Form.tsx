import React from 'react';
import { Routes, Route } from 'react-router-dom';

import BillingAddressForm from './BillingAddressForm/BillingAddressForm';
import InvoiceForm from './InvoiceForm/InvoiceForm';
import LetterTemplate from './LetterTemplate/LetterTemplate';
import SignatureForm from './SignatureForm/SignatureForm';

import styles from './Form.module.scss';

function Form() {
    return (
    <div id={styles.form}>
        <Routes>
            <Route path='/customer' element={<BillingAddressForm />} />
            <Route path='/invoice' element={<InvoiceForm />} />
            <Route path='/signature' element={<SignatureForm />} />
            <Route path='/letter' element={<LetterTemplate />} />
        </Routes>
    </div>);
}

export default Form;