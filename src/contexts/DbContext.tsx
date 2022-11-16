import React, { useContext, useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { billingAddress, defaultState } from '../types/BillingAddress';

const DbContext = React.createContext<any>(null);

export function useDb() {
    return useContext(DbContext);
}

export function DbProvider(props: { children: React.ReactNode }) {
    
    const db = getFirestore();
    
    // collection refs
    const billAddressColRef = collection(db, 'billingAddresses');
    
    // Data collected from Firestore
    const [billingAddresses, setBillingAddresses] = useState<billingAddress[]>([ defaultState ]);

    useEffect(() => {
        onSnapshot(billAddressColRef, (snapshot) =>{
            console.log(snapshot.docs.map((doc: any) => { return {...doc.data(), id: doc.id} }));
            setBillingAddresses(snapshot.docs.map((doc: any) => { return {...doc.data(), id: doc.id} }));
        });
    }, []);

    const value = {
        db,
        billAddressColRef,
        billingAddresses
    };

    return (
        <DbContext.Provider value={ value }>
            { props.children }
        </DbContext.Provider>
    );
}



