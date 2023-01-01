import React from 'react';
import { useDb } from '../../../contexts/DbContext';
import { deleteDoc, doc } from 'firebase/firestore';

import styles from './Invoices.module.scss';

// Children components
import InvoiceForm from './Form/InvoiceForm';

// Typing
import { invoice } from '../../../types/Invoice';

function Invoices() {

    const { db, invoices } = useDb();
    
    const deleteHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const docRef = doc(db, 'invoices', event.currentTarget.id);
        deleteDoc(docRef);
    };

    type docNo = { docNo: number | string };
    const sortInvoices = invoices.sort((a: docNo , b: docNo) => (a.docNo > b.docNo) ? 1 : ((b.docNo > a.docNo) ? -1 : 0))
    const formatNum = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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
                    sortInvoices.map((invoice: invoice) => {
                        const cost = formatNum(Number(invoice.cost));
                        const gst = formatNum(Number(invoice.cost)*0.1);
                        const total = formatNum(Number(invoice.cost) + Number(invoice.cost)*0.1);
                        return (
                            <tr key={invoice.docNo}>
                                <td>{invoice.docNo}</td>
                                <td>{invoice.docType}</td>
                                <td>{invoice.date}/{invoice.month}/{invoice.year}</td>
                                <td>{cost}</td>
                                { Number(invoice.tax) === 1 ? 
                                    (<>
                                        <td>{gst}</td>
                                        <td>{total}</td>
                                    </>) : 
                                    (<>
                                        <td>0.00</td>
                                        <td>{cost}</td>
                                    </>)
                                }
                                <td>
                                    <form>
                                        <input id={invoice.id} type="button" value="Delete" onClick={deleteHandler} />
                                    </form>
                                </td>
                            </tr>
                        )})
                }
            </tbody>
        </table>
        <InvoiceForm />
        </>
    );
}

export default Invoices;