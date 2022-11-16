import React from 'react';

import styles from './DemandLetter.module.scss';

import BillingAddress from './BilllingAddress';
import Invoices from './Invoices';

function DemandLetter() {
    return (
        <div id={styles.demandLetter}>
            <BillingAddress />
            <Invoices />
        </div>
        );
}

export default DemandLetter;