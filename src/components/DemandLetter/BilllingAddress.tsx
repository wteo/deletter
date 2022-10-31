import React from 'react';

import styles from './BillingAddress.module.scss';

function BillingAddress() {
    return (
        <form id={styles.billingAddressForm}>
            <div id={styles.billingAddressContainer}>
                <label>Billed to</label>
                <input type='text'/>
                <label>Position</label>
                <input type='text'/>
                <label>Client Name</label>
                <input type='text'/>
                <label>Unit No/ Level</label>
                <input type='text'/>
                <label>Building Name</label>
                <input type='text'/>
                <label>Street Address</label>
                <input type='text'/>
                <label>Surburb and Postcode</label>
                <input type='text'/>
                <label>State and/or Country</label>
                <input type='text'/>
            </div>
            <button>Submit</button>
        </form>
    );
}

export default BillingAddress;