// Import the functions you need from the SDKs you need
import {initializeApp, getApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore, connectFirestoreEmulator} from 'firebase/firestore';
import {getStorage, connectStorageEmulator} from 'firebase/storage';
import {getFunctions, connectFunctionsEmulator} from 'firebase/functions';
import {getAuth, connectAuthEmulator} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDuwVo0lGblS_a51VClVhWm9GpVlIzWllw',
  authDomain: 'factorio-bp.firebaseapp.com',
  projectId: 'factorio-bp',
  storageBucket: 'factorio-bp.firebasestorage.app',
  messagingSenderId: '567392142762',
  appId: '1:567392142762:web:c2277e29e4e8ad5204d7d3',
  measurementId: 'G-KX02Y645B5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const host = '127.0.0.1';
export const functions = getFunctions(getApp());
export const auth = getAuth();
export const db = getFirestore();

const storage = getStorage();
if (location.hostname === 'localhost') {
  connectFunctionsEmulator(functions, host, 5001);
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, host, 9199);
}

export default app;
