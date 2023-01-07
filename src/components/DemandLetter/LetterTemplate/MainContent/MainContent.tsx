import React from 'react';
import InvoiceTable from './InvoiceTable/InvoiceTable';

// Typing
import { invoice } from 'src/types/Invoice';

function MainContent(props: { recipient: string, invoices: any }) {

    // Address to
    const fullName: string[] = props.recipient.split(' ');
    const firstName: string = fullName[0];

    // Feedback to user regarding invoices
    const noDocErrMessage = <p>Invoices will be listed here in a table. Please add invoice or select a customer with an outstanding balance.</p>;
    const creditErrMessage = <p>This customer has a total balance that is in credit!</p>

    // Calculating the total cost as per customer
    const invoicesWithTax: invoice[] = props.invoices.filter((invoice: invoice) => invoice.tax === 1);
    const costsWithTax: number[] = invoicesWithTax.map((invoice: invoice) => Number(invoice.cost) + Number(invoice.cost)*0.1);
    const invoicesWithoutTax: invoice[] = props.invoices.filter((invoice: invoice) => invoice.tax === 0);
    const costsWithoutTax: number[] = invoicesWithoutTax.map((invoice: invoice) => Number(invoice.cost));
    const allCostsArr: number[] = costsWithTax.concat(costsWithoutTax);
    let sum: number = 0;
    if (allCostsArr.length > 1) {
        sum = allCostsArr.reduce((a: number, b: number) => a + b);
    }

    // Formatting nums
    const formatNum = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div>
            <p>Dear {firstName === '' || firstName.includes('Billed') ? 'Customer' : firstName},</p>
            <p>I am writing to request payment of the following overdue invoices:</p>
            { props.invoices.length < 1  && noDocErrMessage }
            { sum < 0 && creditErrMessage }
            { props.invoices.length >= 1 && <InvoiceTable invoices={props.invoices} />}
            <p>The total amount due is ${ props.invoices.length >= 1 ? formatNum(sum) : '[Total Amount Due]'}. These invoices have been overdue since [most Overdue Invoice].</p>
            <p>I understand that circumstances may arise that prevent timely payment, and I am willing to work with you to find a solution. 
                However, under our agreement, you are required to pay these documents in a timely manner. Despite our attempt to contact
                you on multiple occasions, these invoices have remained outstanding.
            </p>
            <p>Therefore, I request that you arrange payment within 14 days from the date of this letter. 
                If you are unable to make payment within this time frame, please contact me as soon as possible to discuss alternative payment options.
                Where I have not received a response, I will be seeking alternative recovery methods, which may include collection and/or legal.
            </p>
            <p>I appreciate your prompt attention to this matter and look forward to hearing from you.</p>
        </div>
    );
}

export default MainContent;