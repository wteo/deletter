export type invoice = {
    docNo: number | string,
    docType: string, 
    date: number | string,
    month: number | string,
    year: number | string,
    cost: number | string,
    tax: boolean,
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
    tax: true,
    customerName: '',
    id: '',
};

