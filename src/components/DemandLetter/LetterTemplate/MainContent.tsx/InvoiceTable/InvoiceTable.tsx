import React from 'react';
import NewInvoiceRow from './NewInvoiceRow';

function InvoiceTable() {
    return (
        <table>
            <NewInvoiceRow />
            <NewInvoiceRow />
            <NewInvoiceRow />
        </table>
    );
}

export default InvoiceTable;