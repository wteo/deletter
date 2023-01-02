import React from 'react';
// import { billingAddress } from 'src/types/BillingAddress';
import { useDb } from '../../contexts/DbContext';
import { deleteDoc, doc } from 'firebase/firestore';

// Typing
import { invoice } from 'src/types/Invoice';

import styles from './Customers.module.scss';

function Customers() {

    const { db, billingAddresses, invoices } = useDb();

    const sum = (customerName: string) => {
        const filteredInvsWithTax = invoices.filter((inv: invoice) => inv.tax === 1 && inv.customerName === customerName);
        const filteredInvsWithoutTax = invoices.filter((inv: invoice) => inv.tax === 0 && inv.customerName === customerName);
        const costsWithTax = filteredInvsWithTax.map((inv: invoice) => Number(inv.cost) + Number(inv.cost)*0.1);
        const costsWithOutTax = filteredInvsWithoutTax.map((inv: invoice) => Number(inv.cost));
        const allCosts = costsWithTax.concat(costsWithOutTax);
        const sum = allCosts.reduce((a: number, b: number) => a + b, 0);
        return sum;
    }

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
                        <td>${sum(billingAddress.company).toLocaleString(undefined, { 
                            minimumFractionDigits: 2, 
                            maximumFractionDigits: 2 
                            })}
                        </td>
                        <td>Sent</td>
                        <td>
                            <form>
                                <input id={billingAddress.id} type="button" value='Delete' onClick={deleteHandler} />
                                <input type="button" value='Update' disabled />
                            </form>
                        </td>
                    </tr>))
            }
            </tbody>
        </table>);
}

export default Customers;