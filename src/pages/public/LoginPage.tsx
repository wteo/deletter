import React from 'react';

import Login from '../../components/Login';
import PublicRoute from '../../routes/PublicRoute';

function LoginPage() {
    return <PublicRoute><Login /></PublicRoute>;
}

export default LoginPage;