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
                                    <input type="button" value="Delete" />
                                </form>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <form id={styles.invoiceForm}>
            <label>Document no:</label>
            <input type="text" />
            <br/>
            <label>Document Type:</label>
            <select id={styles.invoices}>
                <option value="invoice">Tax Invoice</option>
                <option value="credit">Credit Note</option>
                <option value="overpayment">Overpayment</option>
            </select>
            <br/>
            <label>Billed Date (in MM/DD/YY format):</label>
            <div>
                <input type="text" />
                <input type="text" />
                <input type="text" />
            </div>
            <br/>
            <label>Cost:</label>
            <input type="text" />
            <br/>
            <label>Tax:</label>
            <select id={styles.gst}>
                <option value="gst">GST 10%</option>
                <option value="noGST">No Tax</option>
            </select>
            <br/>
            <button>Submit</button>
        </form>
        </>
    );
}

export default Invoices;