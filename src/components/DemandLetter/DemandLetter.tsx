import React from 'react';

import styles from './DemandLetter.module.scss';

import BillingAddress from './BilllingAddress';

function DemandLetter() {
    return (
        <div id={styles.demandLetter}>
            <h2>Enter Customer's Billing Address</h2>
            <BillingAddress />            
        </div>
        );
}

export default DemandLetter;