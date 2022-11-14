import React from 'react';
import { useDb } from '../contexts/DbContext';


import styles from './Customers.module.scss';

function Customers() {

    const { billingAddresses } = useDb();
    

    return (
        <ul className={styles.customersList}>
            { billingAddresses.map((billingAddress: any) => (
                <li key={ billingAddress.id} >{ billingAddress.company } - { billingAddress.billedTo }</li>
                ))
            }
        </ul>);
}

export default Customers;