import React from 'react';
import NewInvoiceRow from './NewInvoiceRow';

function InvoiceTable(props: { invoices: any }) {
    return (
        <table>
            <tr>
                <th>Document No</th>
                <th>Document Type</th>
                <th>Document Date</th>
                <th>Amount</th>
            </tr>
            { props.invoices.map((invoice: { docNo: string, docType: string, date: string, cost: number, tax: number }) => 
                <NewInvoiceRow key={invoice.docNo} docNo={invoice.docNo} docType={invoice.docType} date={invoice.date} cost={invoice.cost} tax={invoice.tax} />)
            }
        </table>
    );
}

export default InvoiceTable;