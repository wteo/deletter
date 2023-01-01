export type invoice = {
    docNo: number | string,
    docType: string, 
    date: number | string,
    month: number | string,
    year: number | string,
    cost: number | string,
    tax: number,
    customerName: string,
    id: string,
};

export const invoiceDefaultState: invoice = {
    docNo: '',
    docType: 'Tax Invoice', 
    date: '',
    month: '',
    year: '',
    cost: '',
    tax: 1, // options: 1 == with GST, 0 == no GST (Note: cannot type boolean due to using option element)
    customerName: '',
    id: '',
};

