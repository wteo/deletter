export type billingAddress = {
    billedTo    : string,
    position    : string, 
    company     : string,
    building    : string,
    street      : string,
    surburb     : string,
    postcode    : number | string,
    state       : string, 
    country     : string
};

export const defaultState: billingAddress = {
    billedTo    : '',
    position    : '',
    company     : '',
    building    : '',
    street      : '',
    surburb     : '',
    postcode    : '',
    state       : '',
    country     : ''
};