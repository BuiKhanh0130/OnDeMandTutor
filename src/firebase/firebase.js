// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDSrz191Rbkqvq9VtR1I7Xy0zERBdm-hU4',
    authDomain: 'indemand-88ccd.firebaseapp.com',
    projectId: 'indemand-88ccd',
    storageBucket: 'indemand-88ccd.appspot.com',
    messagingSenderId: '1004731217362',
    appId: '1:1004731217362:web:2c3d4f6a97a29dddb1840b',
    measurementId: 'G-2V5PC5EDJ6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const auth = getAuth();
export const db = getFirestore(app);
export default app;
