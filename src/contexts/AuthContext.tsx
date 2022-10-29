import React, { useContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from 'src/firebase';

const auth = getAuth(firebaseApp);

const AuthContext = React.createContext<any>(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props: { children: React.ReactNode }) {

    const [currentUser, setCurrentUser] = useState<string>();

    const signup = (username: string, password: string) => {
        createUserWithEmailAndPassword(auth, username, password);
    };

    const signin = (username: string, password: string) => {
        signInWithEmailAndPassword(auth, username, password);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user: any) => {
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signin,
        signup,
        isLogIn: false,
    };

    return (
        <AuthContext.Provider value={ value }>
            { props.children }
        </AuthContext.Provider>
    );
}

