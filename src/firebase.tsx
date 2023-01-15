import { initializeApp } from 'firebase/app';

type Firebase = {
    apiKey: string,
    authDomain: string,
    projectId: string,
    storageBucket: string, 
    messagingSenderId: string, 
    appID: string
};

const firebaseConfig: Firebase = {
    apiKey: String(process.env.REACT_APP_API_KEY),
    authDomain: String(process.env.REACT_APP_AUTH_DOMAIN),
    projectId: 'deletter-dev',
    storageBucket: 'deletter-dev',
    messagingSenderId: String(process.env.REACT_APP_MESSAGING_SENDER_ID), 
    appID: String(process.env.REACT_APP_APP_ID),
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
