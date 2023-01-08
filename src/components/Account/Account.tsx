import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Customers from './Customers/Customers';
import Invoices from './Invoices/Invoices';

import styles from './Account.module.scss';

function Account() {
    return (
        <div id={styles.account}>
        <Routes>
            <Route path='/customers' element={<Customers />} />
            <Route path='/invoices' element={<Invoices />} />
        </Routes>
        </div>
    );
}

export default Account;