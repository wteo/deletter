import React from 'react';
import { billingAddress } from 'src/types/BillingAddress';
import { useDb } from '../contexts/DbContext';


import styles from './Customers.module.scss';

function Customers() {

    const { billingAddresses } = useDb();
    

    return (
        <table className={styles.customersList}>
            <thead>
                <tr>
                    <th>Billed To</th>
                    <th>Company</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {
                billingAddresses.map((billingAddress: billingAddress) => (
                    <tr key={billingAddress.company}>
                        <td>{billingAddress.billedTo}</td>
                        <td>{billingAddress.company}</td>
                        <td></td>
                        <td></td>
                        <td>
                            <button>Delete</button>
                            <button>Update</button>
                        </td>
                    </tr>
                )) 
            }
            </tbody>
        </table>);
}

export default Customers;