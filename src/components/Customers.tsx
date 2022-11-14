import React from 'react';
import { useDb } from '../contexts/DbContext';


import styles from './Customers.module.scss';

function Customers() {

    const { billingAddresses } = useDb();

    return (
        <div className={styles.customersList}>
            <p>{ billingAddresses[0].billedTo }</p>
            <p>{ billingAddresses[0].position }</p>
            <p>{ billingAddresses[0].company }</p>
            <p>{ billingAddresses[0].building }</p>
            <p>{ billingAddresses[0].street }</p>
            <p>{ billingAddresses[0].surburb }</p>
            <p>{ billingAddresses[0].postcode }</p>
            <p>{ billingAddresses[0].state }</p>
            <p>{ billingAddresses[0].country }</p>
        </div>);
}

export default Customers;