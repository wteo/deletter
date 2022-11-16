export type invoice = {
    docNo: string,
    docType: string, 
    date: number | null,
    month: number | null,
    year: number | null,
    cost: number | null,
    tax: boolean
};

export const invoiceDefaultState: invoice = {
    docNo: '',
    docType: '', 
    date: null,
    month: null,
    year: null,
    cost: null,
    tax: true
};