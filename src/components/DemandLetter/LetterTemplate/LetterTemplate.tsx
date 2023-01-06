import React from 'react';

import BillingAddress from './BillingAddress';
import MainContent from './MainContent/MainContent';
import Signature from './Signature';

import style from './LetterTemplate.module.scss';

function LetterTemplate() {
    return (
        <div id={style.letterTemplate}>
            <BillingAddress />
            <h2>Re: Demand for Payment of Overdue Invoices</h2>
            <MainContent />
            <Signature />
        </div> 
    );
}

export default LetterTemplate;