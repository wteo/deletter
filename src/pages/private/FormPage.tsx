import React from 'react';

import Form from '../../components/Form/Form';
import PrivateRoute from '../../routes/PrivateRoute';

function FormPage() {
    return <PrivateRoute><Form /></PrivateRoute>;
}

export default FormPage;