import React from 'react';

import styles from './CustomerAddress.module.scss';

// Typing
import { billingAddress } from '../../../../types/BillingAddress';

function CustomerAddress(props: billingAddress) {

    return (
        <div id={styles.customerAddress} data-testid='billingAddress'>
            <p>{props.billedTo === '' ? '' : `Attn: ${props.billedTo}`}</p>
            <p>{props.position}</p>
            <p>{props.company}</p>
            <p>{props.building}</p>
            <p>{props.street}</p>
            <p>{props.surburb}, {props.state}, {props.postcode}</p>
            <p>{props.country}</p>
        </div>
    );
}

export default CustomerAddress;