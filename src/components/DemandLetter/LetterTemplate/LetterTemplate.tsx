import React from 'react';

import style from './LetterTemplate.module.scss';

function LetterTemplate() {
    return (
        <div id={style.letterTemplate}>
            <div>
                <p>[Recipient Name]</p>
                <p>[Recipient Address]</p>
                <p>[Date]</p>
            </div>
            <h2>Re: Demand for Payment of Overdue Invoices</h2>
            <div>
                <p>Dear [Recipient Name],</p>
                <p>I am writing to request payment of the following overdue invoices:</p>
                <table>
                    <tr>
                        <th>Invoice Number</th>
                        <th>Invoice Date</th>
                        <th>Amount Due</th>
                    </tr>
                    <tr>
                        <td>[Invoice Number 1]</td>
                        <td>[Invoice Date 1]</td>
                        <td>$[Amount Due 1]</td>
                    </tr>
                    <tr>
                        <td>[Invoice Number 2]</td>
                        <td>[Invoice Date 2]</td>
                        <td>$[Amount Due 2]</td>
                    </tr>
                    <tr>
                        <td>[Invoice Number 3]</td>
                        <td>[Invoice Date 3]</td>
                        <td>$[Amount Due 3]</td>
                    </tr>
                </table>
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
            <div>
                <p>Sincerely</p>
                <p>[signature]</p>
                <p>[Your name]</p>
                <p>[title]</p>
                <p>[contact]</p>
            </div>
        </div> 
    );
}

export default LetterTemplate;