import React, { useReducer, useState } from 'react';
import { useDb } from '../../../../contexts/DbContext';
import { addDoc } from 'firebase/firestore';

// Typing 
import { invoice, invoiceDefaultState } from '../../../../types/Invoice';

import styles from './InvoiceForm.module.scss';

const ACTIONS = {
    docNo           : 'ENTER_DOC_NO',
    docType         : 'ENTER_DOC_TYPE',
    date            : 'ENTER_DATE',
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

    const { invoiceColRef, invoices, billingAddresses } = useDb();

    // State for Invoice
    const [newState, dispatch] = useReducer(reducer, invoiceDefaultState);
    const { docNo, docType, date, cost, tax, customerName } : invoice = newState;
    
    // States for error messages where user enters wrong data
    const [docNoError, setDocNoError] = useState<string>('');
    const [dateError, setDateError] = useState<string>('');
    const [costError, setCostError] = useState<string>('');
    const [customerError, setcustomerError] = useState<string>('');

    // Listing all existing customer names in alphabetical order
    type company = { company: string };
    const sortCustomerNames = billingAddresses.sort((a: company, b: company) => (a.company > b.company) ? 1 : ((b.company > a.company) ? -1 : 0));

    const changeHandlers = {
        docNo           : (event: React.ChangeEvent<HTMLInputElement>) => { 
                                dispatch({ type: ACTIONS.docNo, value: event.target.value });
                                setDocNoError('');
                                },
        docType         : (event: React.ChangeEvent<HTMLSelectElement>) => {
                                dispatch({ type: ACTIONS.docType, value: event.target.value });
                                setCostError('');
                                },
        date            : (event: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch({ type: ACTIONS.date, value: event.target.value });
                                setDateError('');
                                },
        cost            : (event: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch({ type: ACTIONS.cost, value: event.target.value })
                                setCostError('');
                                },
        tax             : (event: React.ChangeEvent<HTMLSelectElement>) => dispatch({ type: ACTIONS.tax, value: Number(event.target.value) }),
        customerName    : (event: React.ChangeEvent<HTMLSelectElement>) => {
                                dispatch({ type: ACTIONS.customerName, value: event.target.value })
                                setcustomerError('');
                                },
    };


    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        // Conditions when adding new Documents
        // Doc no
        if (docNo === '') {
            setDocNoError('Please enter a Document No.');
            throw new Error(docNoError);
        }
        for (const invoice of invoices) {
            if (docNo === invoice.docNo) {
                setDocNoError('This item already exists. Please enter a different Document No.');
                throw new Error(docNoError);
            }
        };

        // Date
        const dateParts = date.split('-');
        const day: number = Number(dateParts[0]);
        const month: number = Number(dateParts[1]);
        const year: number = Number(dateParts[2]);
        // Rules to validate dates
        const monthsWithOnly30Days = day > 30 && (month === 4 || 6 || 9 || 11);
        const febInLeapYear = day > 29 && month === 2 && year % 4 === 0;
        const febInNonLeapYear = day > 28 && month === 2 && year % 4 !== 0;

        if (!date.match(/^\d{2}-\d{2}-\d{2}$/)) {
            setDateError('Invalid date format.');
            throw new Error(dateError);
            }
        if (date.match(/^\d{2}-\d{2}-\d{2}$/)) {
            if (day > 31 || month > 12 || monthsWithOnly30Days || febInLeapYear || febInNonLeapYear) {
                setDateError('Invalid date.');
                throw new Error(dateError);
            }
        }

        // Doc Type & Cost
        if (docType === 'Tax Invoice' && Number(cost) < 0) {
            setCostError('Cost must be in positive balance.');
            throw new Error(costError);
        }
        if ((docType === 'Overpayment' || docType === 'Credit Note') && Number(cost) > 0) {
            setCostError('Cost must be in negative balance.');
            throw new Error(costError);
        }
        
        // Billed To (a.k.a customerName)
        if (customerName === '') {
            setcustomerError('Please select an existing customer.');
            throw new Error(customerError);
        }

        // Where conditions are all met, new document will be created and added to DB.        
        addDoc(invoiceColRef, {
                docNo,
                docType,
                date,
                cost,
                tax,
                customerName, // billed to company
        })
        .then(() => {
            console.log({ docNo, docType, date, cost, tax, customerName });
            dispatch({ type: ACTIONS.reset });
        })
    }

    return (
        <>
        <h2>Enter Invoice Details</h2>
        <form aria-label='invoice' id={styles.invoiceForm} onSubmit={submitHandler}>
            <div className={styles.invoiceContainer}>
                <label>Document no</label>
                <input type="text" name="docNo" value={docNo} onChange={changeHandlers.docNo} />
                <p>{docNoError}</p>
            </div>
            <div className={styles.invoiceContainer}>
            <label>Document Type</label>
                <select value={docType} name="docType" onChange={changeHandlers.docType} >
                    <option value="Tax Invoice">Tax Invoice</option>
                    <option value="Credit Note">Credit Note</option>
                    <option value="Overpayment">Overpayment</option>
                </select>
            </div>
            <div className={styles.invoiceContainer}>
                <label>Billed Date</label>
                <div>
                    <input type="text"
                    name="date"
                    placeholder="DD-MM-YY"
                    value={date}
                    onChange={changeHandlers.date} 
                    />
                </div>
                <p>{dateError}</p>
            </div>
            <div className={styles.invoiceContainer}>
                <label>Cost</label>
                <input type="text" name="cost" value={cost} onChange={changeHandlers.cost} />
                <p>{costError}</p>
            </div>
            <div className={styles.invoiceContainer}>
                <label>Tax</label>
                <select value={tax} name="tax" onChange={changeHandlers.tax}>
                    <option value="1">GST 10%</option>
                    <option value="0">No Tax</option>
                </select>
            </div>
            <div className={styles.invoiceContainer}>
                <label>BilledTo</label>
                <select value={customerName} name="customerName" onChange={changeHandlers.customerName}>
                    <option value="">Please select customer name.</option>
                    {
                        sortCustomerNames.map((customerName: company) => 
                            <option key={customerName.company} value={customerName.company}>{customerName.company}</option>)
                    }
                </select>
                <p>{customerError}</p>
            </div>
            <button>Submit</button>
        </form>
        </>
    );
};

export default InvoiceForm;