import React from 'react';

import { useDb } from '../../../contexts/DbContext';
import { deleteDoc, doc } from 'firebase/firestore';

import styles from './Signatures.module.scss';

function Signatures() {

    const { db, signatures } = useDb();

    const deleteHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const docRef = doc(db, 'signatures', event.currentTarget.id);
        deleteDoc(docRef);
    };

    return (
        <table id={styles.signaturesList}>
            <thead>
                <tr>
                    <th>Signed By</th>
                    <th>Position</th>
                    <th>Company</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {
                signatures.map((signature: any) => (
                    <tr key={`${signature.signedName}${signature.signedCompany}`.replace(' ', '')}>
                        <td>{signature.signedName}</td>
                        <td>{signature.signedPosition}</td>
                        <td>{signature.signedCompany}</td>
                        <td>{signature.phone}</td>
                        <td>{signature.email}</td>
                        <td>
                            <form>
                                <input id={signature.id} type="button" value='Delete' onClick={deleteHandler} />
                            </form>
                        </td>
                    </tr>))
            }
            </tbody>
        </table>);
}

export default Signatures;