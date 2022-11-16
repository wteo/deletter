import React from 'react';

import styles from './Invoices.module.scss';

function Invoices() {

    const invoices = [{
        docNo: '0001',
        type: 'Tax Invoice',
        date: '11/11/22',
        cost: 302.57,
    }, {
        docNo: '0002',
        type: 'Tax Invoice',
        date: '11/11/22',
        cost: 900.00,
    }]

    return (
        <table id={styles.invoicesList}>
            <thead>
                <tr>
                    <th>Document no</th>
                    <th>Document type</th>
                    <th>Billed date</th>
                    <th>Amount</th>
                    <th>GST</th>
                    <th>Billed</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    invoices.map(invoice => (
                        <tr key={invoice.docNo}>
                            <td>{invoice.docNo}</td>
                            <td>{invoice.type}</td>
                            <td>{invoice.date}</td>
                            <td>{invoice.cost.toFixed(2)}</td>
                            <td>{(invoice.cost*0.1).toFixed(2)}</td>
                            <td>{(invoice.cost + invoice.cost*0.1).toFixed(2)}</td>
                            <td>
                                <form>
                                    <input type="button" value="delete" />
                                </form>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default Invoices;