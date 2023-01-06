import React from 'react';

// import { useDb } from 'src/contexts/DbContext';

// Typing
import { billingAddress } from 'src/types/BillingAddress';

function BillingAddress() {

    // const { billingAddresses } = useDb();

    // For testing
    const billingAddress = {
        billedTo: '',
        position: '',
        company: 'Medibank',
        building: '',
        street: '20 George Street',
        surburb: 'Sydney',
        postcode: '2000',
        state: 'NSW',
        country: 'Australia'
    }

    const { billedTo, position, company, building, street, surburb, postcode, state, country }: billingAddress = billingAddress;

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