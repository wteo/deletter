import React from 'react';

import DemandLetter from '../../components/DemandLetter';
import PrivateRoute from '../../routes/PrivateRoute';

function DashboardPage() {
    return <PrivateRoute><DemandLetter /></PrivateRoute>;
}

export default DashboardPage;