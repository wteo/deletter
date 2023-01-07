import React from 'react';
import NewInvoiceRow from './NewInvoiceRow';

function InvoiceTable(props: { invoices: any }) {

    const sortInvsByDates = props.invoices.sort((a: { date: string }, b: { date: string }) => {
        const x: string = a.date.split('-').reverse().join();
        const y: string = b.date.split('-').reverse().join();
        return x < y ? -1 : (x > y ? 1 : 0);
        });

    return (
        <table>
            <tr>
                <th>Document No</th>
                <th>Document Type</th>
                <th>Document Date</th>
                <th>Amount</th>
            </tr>
            { sortInvsByDates.map((invoice: { docNo: string, docType: string, date: string, cost: number, tax: number }) => 
                <NewInvoiceRow key={invoice.docNo} docNo={invoice.docNo} docType={invoice.docType} date={invoice.date} cost={invoice.cost} tax={invoice.tax} />)
            }
        </table>
    );
}

export default InvoiceTable;