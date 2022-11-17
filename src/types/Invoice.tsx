export type invoice = {
    docNo: string,
    docType: string, 
    date: number | string,
    month: number | string,
    year: number | string,
    cost: number | string,
    tax: boolean
};

export const invoiceDefaultState: invoice = {
    docNo: '',
    docType: 'Tax Invoice', 
    date: '',
    month: '',
    year: '',
    cost: '',
    tax: true
};

