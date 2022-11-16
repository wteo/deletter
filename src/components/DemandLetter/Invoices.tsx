import React, { useReducer } from 'react';
import { useDb } from '../../contexts/DbContext';
import { addDoc } from 'firebase/firestore';
import { invoice, invoiceDefaultState } from 'src/types/Invoice';

import styles from './Invoices.module.scss';

const ACTIONS = {
    docNo   : 'ENTER_DOC_NO',
    docType : 'ENTER_DOC_TYPE',
    date    : 'ENTER_DATE',
    month   : 'ENTER_MONTH',
    year    : 'ENTER_YEAR',
    cost    : 'ENTER_COST',
    tax     : 'SELECT_TAX',
    reset   : 'RESET'
};

const reducer = (state: invoice, action: { type: string, value?: any }) => {
    switch (action.type) {
        case ACTIONS.docNo: 
            return { ...state, docNo: action.value }
        case ACTIONS.docType: 
            return { ...state, docType: action.value}
        case ACTIONS.date: 
            return { ...state, date: action.value }
        case ACTIONS.month: 
            return { ...state, month: action.value }
        case ACTIONS.year:
            return { ...state, year: action.value }
        case ACTIONS.cost: 
            return { ...state, cost: action.value }
        case ACTIONS.tax: 
            return { ...state, tax: action.value }
        case ACTIONS.reset:
            return { ...invoiceDefaultState }
        default:
            return invoiceDefaultState;  
    }
}

function Invoices() {

    const { invoiceColRef, invoices } = useDb();

    const [newState, dispatch] = useReducer(reducer, invoiceDefaultState);
    const { docNo, docType, date, month, year, cost, tax } : invoice = newState;

    const docNoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ACTIONS.docNo, value: event.target.value });
    };

    /*

    const docTypeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ACTIONS.docType, value: event.target.value });
    };
    */

    const dateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ACTIONS.date, value: event.target.value });
    };

    const monthHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ACTIONS.month, value: event.target.value });
    };

    const yearHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ACTIONS.year, value: event.target.value });
    };

    const costHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ACTIONS.cost, value: event.target.value });
    };
    /*
    const taxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ACTIONS.tax, value: event.target.value });
    };
    */

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        addDoc(invoiceColRef, {
            docNo,
            docType,
            date,
            month, 
            year, 
            cost, 
            tax,
        })
        .then(() => {
            console.log({ docNo, docType, date, month, year, cost, tax });
            dispatch({ type: ACTIONS.reset });
        })
    }

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
                        <tr key={invoice.docType}>
                            <td>{invoice.docNo}</td>
                            <td>{invoice.docType}</td>
                            <td>{invoice.date}/{invoice.month}/{invoice.year}</td>
                            <td>{invoice.cost}</td>
                            <td>{invoice.cost*0.1}</td>
                            <td>{invoice.cost + invoice.cost*0.1}</td>
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
        <form id={styles.invoiceForm} onSubmit={submitHandler}>
            <label>Document no:</label>
            <input type="text" onChange={docNoHandler} />
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
                <input type="text" onChange={dateHandler} />
                <input type="text" onChange={monthHandler} />
                <input type="text" onChange={yearHandler} />
            </div>
            <br/>
            <label>Cost:</label>
            <input type="text" onChange={costHandler} />
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