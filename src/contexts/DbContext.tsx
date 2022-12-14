import React, { useContext, useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { billingAddress, billingAddressDefaultState } from '../types/BillingAddress';
import { invoice, invoiceDefaultState } from '../types/Invoice';
import { signature, signatureDefaultState } from 'src/types/Signature';

const DbContext = React.createContext<any>(null);

export function useDb() {
    return useContext(DbContext);
}

export function DbProvider(props: { children: React.ReactNode }) {
    
    const db = getFirestore();
    
    // collection refs
    const billAddressColRef = collection(db, 'billingAddresses');
    const invoiceColRef = collection(db, 'invoices');
    const signatureColRef = collection(db, 'signatures');
    
    // Data collected from Firestore
    const [billingAddresses, setBillingAddresses] = useState<billingAddress[]>([billingAddressDefaultState]);
    const [invoices, setInvoices] = useState<invoice[]>([invoiceDefaultState]);
    const [signatures, setSignatures] = useState<signature[]>([signatureDefaultState]);

    useEffect(() => {
        // Fetching billingAddress
        onSnapshot(billAddressColRef, (snapshot) =>{
            // console.log(snapshot.docs.map((doc: any) => { return {...doc.data(), id: doc.id} }));
            setBillingAddresses(snapshot.docs.map((doc: any) => { return {...doc.data(), id: doc.id} }));
        });

        // Fetching invoices
        onSnapshot(invoiceColRef, (snapshot) =>{
            // console.log(snapshot.docs.map((doc: any) => { return {...doc.data(), id: doc.id} }));
            setInvoices(snapshot.docs.map((doc: any) => { return {...doc.data(), id: doc.id} }));
        });

        // Fetching signatures
        onSnapshot(signatureColRef, (snapshot) =>{
            // console.log(snapshot.docs.map((doc: any) => { return {...doc.data(), id: doc.id} }));
            setSignatures(snapshot.docs.map((doc: any) => { return {...doc.data(), id: doc.id} }));
        });

    }, 
    // eslint-disable-next-line
    []);

    const value = {
        db,
        billAddressColRef,
        billingAddresses,
        invoiceColRef,
        invoices,
        signatureColRef,
        signatures,
    };

    return (
        <DbContext.Provider value={ value }>
            { props.children }
        </DbContext.Provider>
    );
}



