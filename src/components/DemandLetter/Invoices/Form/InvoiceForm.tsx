import React, { useReducer } from 'react';
import { useDb } from '../../../../contexts/DbContext';
import { addDoc } from 'firebase/firestore';

// Typing 
import { invoice, invoiceDefaultState } from '../../../../types/Invoice';

import styles from './InvoiceForm.module.scss';

const ACTIONS = {
    docNo           : 'ENTER_DOC_NO',
    docType         : 'ENTER_DOC_TYPE',
    date            : 'ENTER_DATE',
    month           : 'ENTER_MONTH',
    year            : 'ENTER_YEAR',
    cost            : 'ENTER_COST',
    tax             : 'SELECT_TAX',
    customerName    : 'SELECT_customerName',
    reset           : 'RESET'
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
        case ACTIONS.customerName:
            return { ...state, customerName: action.value }
        case ACTIONS.reset:
            return { ...invoiceDefaultState }
        default:
            return invoiceDefaultState;  
    }
}

function InvoiceForm() {

    const { invoiceColRef, billingAddresses } = useDb();

    const [newState, dispatch] = useReducer(reducer, invoiceDefaultState);
    const { docNo, docType, date, month, year, cost, tax, customerName } : invoice = newState;

    type company = { company: string };
    const sortCustomerNames = billingAddresses.sort((a: company, b: company) => (a.company > b.company) ? 1 : ((b.company > a.company) ? -1 : 0));

    const changeHandlers = {
        docNo           : (event: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: ACTIONS.docNo, value: event.target.value }),
        docType         : (event: React.ChangeEvent<HTMLSelectElement>) => dispatch({ type: ACTIONS.docType, value: event.target.value }),
        date            : (event: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: ACTIONS.date, value: event.target.value }),
        month           : (event: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: ACTIONS.month, value: event.target.value }),
        year            : (event: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: ACTIONS.year, value: event.target.value }),
        cost            : (event: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: ACTIONS.cost, value: event.target.value }),
        tax             : (event: React.ChangeEvent<HTMLSelectElement>) => dispatch({ type: ACTIONS.tax, value: Number(event.target.value) }),
        customerName    : (event: React.ChangeEvent<HTMLSelectElement>) => dispatch({ type: ACTIONS.customerName, value: event.target.value }),
    };

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
                customerName, // billed to company
        })
        .then(() => {
            console.log({ docNo, docType, date, month, year, cost, tax, customerName });
            dispatch({ type: ACTIONS.reset });
        })
    }

    return (
        <>
        <h2>Enter Invoice Details</h2>
        <form aria-label='invoice' id={styles.invoiceForm} onSubmit={submitHandler}>
            <div className={styles.invoiceContainer}>
                <label>Document no</label>
                <input type="text" value={docNo} onChange={changeHandlers.docNo} />
            </div>
            <div className={styles.invoiceContainer}>
            <label>Document Type</label>
                <select value={docType} onChange={changeHandlers.docType} >
                    <option value="Tax Invoice">Tax Invoice</option>
                    <option value="Credit Note">Credit Note</option>
                    <option value="Overpayment">Overpayment</option>
                </select>
            </div>
            <div className={styles.invoiceContainer}>
                <label>Billed Date (MM/DD/YY)</label>
                <div>
                    <input type="text" value={date} onChange={changeHandlers.date} />/
                    <input type="text" value={month} onChange={changeHandlers.month} />/
                    <input type="text" value={year} onChange={changeHandlers.year} />
                </div>
            </div>
            <div className={styles.invoiceContainer}>
                <label>Cost</label>
                <input type="text" value={cost} onChange={changeHandlers.cost} />
            </div>
            <div className={styles.invoiceContainer}>
                <label>Tax</label>
                <select value={tax} onChange={changeHandlers.tax}>
                    <option value="1">GST 10%</option>
                    <option value="0">No Tax</option>
                </select>
            </div>
            <div className={styles.invoiceContainer}>
                <label>BilledTo</label>
                <select value={customerName} onChange={changeHandlers.customerName}>
                    <option value="">Please select customer name.</option>
                    {
                        sortCustomerNames.map((customerName: company) => 
                            <option key={customerName.company} value={customerName.company}>{customerName.company}</option>)
                    }
                </select>
            </div>
            <button>Submit</button>
        </form>
        </>
    );
};

export default InvoiceForm;