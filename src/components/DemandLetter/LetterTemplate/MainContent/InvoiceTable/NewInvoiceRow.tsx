import React from 'react';

function NewInvoiceRow(props: { docNo: string, docType: string, date: string, cost: number, tax: number }) {

    const cost = Number(props.cost);
    const tax = Number(props.cost*0.1);
    const sum = Number(cost + tax);

    // Formatting nums
    const formatNum = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <tr>
            <td>{props.docNo}</td>
            <td>{props.docType}</td>
            <td>{props.date}</td>
            <td>{props.tax === 1 ? formatNum(sum) : formatNum(cost)}</td>
        </tr>
    );
}

export default NewInvoiceRow;