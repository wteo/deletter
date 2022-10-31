import React from 'react';

import styles from './DemandLetter.module.scss';

function DemandLetter() {
    return (
        <div id={styles.demandLetter}>
            <h2>Enter Customer's Billing Address</h2>
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
        </div>
        );
}

export default DemandLetter;