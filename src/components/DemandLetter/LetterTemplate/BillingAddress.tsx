import React from 'react';

import { useDb } from 'src/contexts/DbContext';

// Typing
import { billingAddress } from 'src/types/BillingAddress';

function BillingAddress() {

    const { billingAddresses } = useDb();
    const { billedTo, position, company, building, street, surburb, postcode, state, country }: billingAddress = billingAddresses[0];

    return (
        <div data-testid='billingAddress'>
            <p>{billedTo}</p>
            <p>{position}</p>
            <p>{company}</p>
            <p>{building}</p>
            <p>{street}</p>
            <p>{surburb}, {state}, {postcode}</p>
            <p>{country}</p>
        </div>
    );
}

export default BillingAddress;