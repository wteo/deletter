import React from 'react';
import { useDb } from '../../contexts/DbContext';
import { deleteDoc, doc } from 'firebase/firestore';

import styles from './Invoices.module.scss';

// Children components
import InvoiceForm from './InvoiceForm';

function Invoices() {

    const { db, invoices } = useDb();

    const deleteHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const docRef = doc(db, 'invoices', event.currentTarget.id);
        deleteDoc(docRef);
    };

    const sortedInvoices = invoices.sort((a: any, b: any) => a.docNo - b.docNo);

    return (
        <>
        <table id={styles.invoicesList}>
            <thead>
                <tr>
                    <th>Document no</th>
                    <th>Document type</th>
                    <th>Billed date</th>
                    <th>Cost</th>
                    <th>GST</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    sortedInvoices.map((invoice: any) => (
                        <tr key={invoice.docNo}>
                            <td>{invoice.docNo}</td>
                            <td>{invoice.docType}</td>
                            <td>{invoice.date}/{invoice.month}/{invoice.year}</td>
                            <td>{invoice.cost}</td>
                            <td>{invoice.cost*0.1}</td>
                            <td>{Number(invoice.cost) + Number(invoice.cost*0.1)}</td>
                            <td>
                                <form>
                                    <input id={invoice.id} type="button" value="Delete" onClick={deleteHandler} />
                                </form>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <InvoiceForm />
        </>
    );
}

export default Invoices;