import React from 'react';
import { useDb } from '../../contexts/DbContext';

import styles from './Invoices.module.scss';

// Children components
import InvoiceForm from './InvoiceForm';

function Invoices() {

    const { invoices } = useDb();

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
                    invoices.map((invoice: any) => (
                        <tr key={invoice.docNo}>
                            <td>{invoice.docNo}</td>
                            <td>{invoice.docType}</td>
                            <td>{invoice.date}/{invoice.month}/{invoice.year}</td>
                            <td>{invoice.cost}</td>
                            <td>{invoice.cost*0.1}</td>
                            <td>{Number(invoice.cost) + Number(invoice.cost*0.1)}</td>
                            <td>
                                <form>
                                    <input type="button" value="Delete" />
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