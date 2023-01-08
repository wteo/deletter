import React from 'react';
import NewInvoiceRow from './NewInvoiceRow';

import styles from './InvoiceTable.module.scss';

function InvoiceTable(props: { invoices: any }) {

    const sortInvsByDates = props.invoices.sort((a: { date: string }, b: { date: string }) => {
        const x: string = a.date.split('-').reverse().join();
        const y: string = b.date.split('-').reverse().join();
        return x < y ? -1 : (x > y ? 1 : 0);
        });

    return (
        <table id={styles.invoicesListLetter}>
            <thead>
                <tr>
                    <th>Document No</th>
                    <th>Document Type</th>
                    <th>Document Date</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                { sortInvsByDates.map((invoice: { docNo: string, docType: string, date: string, cost: number, tax: number }) => 
                    <NewInvoiceRow key={invoice.docNo} docNo={invoice.docNo} docType={invoice.docType} date={invoice.date} cost={invoice.cost} tax={invoice.tax} />)
                }
            </tbody>
        </table>
    );
}

export default InvoiceTable;