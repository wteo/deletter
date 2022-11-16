export type invoice = {
    docNo: string,
    type: string, 
    date: number | null,
    month: number | null,
    year: number | null,
    cost: number | null,
    gst: boolean
};

export const invoiceDefaultState: invoice = {
    docNo: '',
    type: '', 
    date: null,
    month: null,
    year: null,
    cost: null,
    gst: true
};