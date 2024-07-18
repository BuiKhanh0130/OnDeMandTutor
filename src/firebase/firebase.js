// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyC_SOTIPlbytxUgRMzBurikw8jXCxf2YaI',
    authDomain: 'ondemandtutor-a1371.firebaseapp.com',
    projectId: 'ondemandtutor-a1371',
    storageBucket: 'ondemandtutor-a1371.appspot.com',
    messagingSenderId: '158740193604',
    appId: '1:158740193604:web:0fb09d587fb3f247e73711',
    measurementId: 'G-SF34K3EFJC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
