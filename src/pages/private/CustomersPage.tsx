import React from 'react';

import Customers from '../../components/Customers';
import PrivateRoute from '../../routes/PrivateRoute';

function CustomersPage() {
    return <PrivateRoute><Customers /></PrivateRoute>;
}

export default CustomersPage;