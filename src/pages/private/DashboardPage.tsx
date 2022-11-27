import React from 'react';

import Dashboard from '../../components/Dashboard/Dashboard';
import PrivateRoute from '../../routes/PrivateRoute';

function DashboardPage() {
    return <PrivateRoute><Dashboard /></PrivateRoute>;
}

export default DashboardPage;