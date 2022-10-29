import React, { useContext, useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import firebaseApp from 'src/firebase';

export const auth = getAuth(firebaseApp);

const AuthContext = React.createContext<any>(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props: { children: React.ReactNode }) {

    const [currentUser, setCurrentUser] = useState<string>();

    const [isLogIn, setIsLogIn] = useState<boolean>(false);

    const isLogInHandler = (value: boolean) => {
        setIsLogIn(value);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user: any) => {
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        isLogIn,
        isLogInHandler,
    };

    return (
        <AuthContext.Provider value={ value }>
            { props.children }
        </AuthContext.Provider>
    );
}

