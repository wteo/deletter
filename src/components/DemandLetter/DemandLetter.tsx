import React from 'react';

import styles from './DemandLetter.module.scss';

import BillingAddress from './BilllingAddress';

function DemandLetter() {
    return (
        <div id={styles.demandLetter}>
            <BillingAddress />
        </div>
        );
}

export default DemandLetter;