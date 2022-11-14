import React, { useContext } from 'react';
import { getFirestore, collection } from 'firebase/firestore';

const DbContext = React.createContext<any>(null);

export function useDb() {
    return useContext(DbContext);
}


export function DbProvider(props: { children: React.ReactNode }) {
    
    const db = getFirestore();
    const billingAddresses = collection(db, 'billingAddresses');
    /*
    useEffect(() => {
        getDocs(billingAddresses);
    }, []);
    */

    const value = {
        billingAddresses,
    };

    return (
        <DbContext.Provider value={ value }>
            { props.children }
        </DbContext.Provider>
    );
}



