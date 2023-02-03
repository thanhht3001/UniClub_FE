// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDVmzFWGgFf5Mh9uwpyV1MHsKWT40hO_PQ',
  authDomain: 'unics-e46a4.firebaseapp.com',
  projectId: 'unics-e46a4',
  storageBucket: 'unics-e46a4.appspot.com',
  messagingSenderId: '1000685570084',
  appId: '1:1000685570084:web:ca6f7a4b3cad26de19b0b1',
  measurementId: 'G-Z73T8JVKMR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
