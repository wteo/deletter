import React from 'react';

import styles from './Signature.module.scss';

// Typing
import { signature } from '../../../../types/Signature';

function Signature(props: signature) {
    return (
        <div id={styles.signature}>
            <p>Sincerely,</p>
            <br/>
            <p>{props.signedName}</p>
            <p>{props.signedPosition}</p>
            <p>{props.signedCompany}</p>
            <p>{props.phone}</p>
            <p>{props.email}</p>      
        </div>
    );
}

export default Signature;