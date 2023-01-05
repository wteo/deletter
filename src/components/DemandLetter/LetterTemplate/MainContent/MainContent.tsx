import React from 'react';

import InvoiceTable from './InvoiceTable/InvoiceTable';

function MainContent() {
    return (
        <div>
            <p>Dear [Recipient Name],</p>
            <p>I am writing to request payment of the following overdue invoices:</p>
            <InvoiceTable />
            <p>The total amount due is $[Total Amount Due]. These invoices have been overdue since [most Overdue Invoice].</p>
            <p>I understand that circumstances may arise that prevent timely payment, and I am willing to work with you to find a solution. 
                However, under our agreement, you are required to pay these documents in a timely manner. Despite our attempt to contact
                you on multiple occasions, these invoices have remained outstanding.
            </p>
            <p>Therefore, I request that you arrange payment within [number] from the date of this letter. 
                If you are unable to make payment within this time frame, please contact me as soon as possible to discuss alternative payment options.
                Where I have not received a response, I will be seeking alternative recovery methods, which may include collection and/or legal.
            </p>
            <p>I appreciate your prompt attention to this matter and look forward to hearing from you.</p>
        </div>
    );
}

export default MainContent;