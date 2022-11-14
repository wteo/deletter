import React, { useContext } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { billingAddress } from '../types/BillingAddress';

const DbContext = React.createContext<any>(null);

export function useDb() {
    return useContext(DbContext);
}

export function DbProvider(props: { children: React.ReactNode }) {
    
    const db = getFirestore();
    
    // collection refs
    const billAddressColRef = collection(db, 'billingAddresses');
    
    // Data collected from Firestore
    const billingAddresses: billingAddress[] = [];
    
    onSnapshot(billAddressColRef, (snapshot) => {
        snapshot.docs.forEach((doc: any) => {
            billingAddresses.push({ ...doc.data() })
        })
        console.log(billingAddresses);
    });

    const value = {
        billAddressColRef,
        billingAddresses
    };

    return (
        <DbContext.Provider value={ value }>
            { props.children }
        </DbContext.Provider>
    );
}



