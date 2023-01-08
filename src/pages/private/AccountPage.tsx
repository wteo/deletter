import React from 'react';

import Account from '../../components/Account/Account';
import PrivateRoute from '../../routes/PrivateRoute';

function AccountPage() {
    return <PrivateRoute><Account /></PrivateRoute>;
}

export default AccountPage;