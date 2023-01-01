import React from 'react';
// import { billingAddress } from 'src/types/BillingAddress';
import { useDb } from '../../contexts/DbContext';
import { deleteDoc, doc } from 'firebase/firestore';

import styles from './Customers.module.scss';

function Customers() {

    const { db, billingAddresses } = useDb();

    const deleteHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const docRef = doc(db, 'billingAddresses', event.currentTarget.id);
        deleteDoc(docRef);
    };
    

    return (
        <table id={styles.customersList}>
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
                billingAddresses.map((billingAddress: { company: string, billedTo: string, id: string }) => (
                    <tr key={billingAddress.company}>
                        <td>{billingAddress.billedTo}</td>
                        <td>{billingAddress.company}</td>
                        <td>$10,000.00</td>
                        <td>Sent</td>
                        <td>
                            <form>
                                <input id={billingAddress.id} type="button" value='Delete' onClick={deleteHandler} />
                                <input type="button" value='Update' disabled />
                            </form>
                        </td>
                    </tr>
                )) 
            }
            </tbody>
        </table>);
}

export default Customers;