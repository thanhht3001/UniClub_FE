// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDtu4VForkQtHpNrxOx6N3PM_TwsiEB2rs',
  authDomain: 'uniclubproject.firebaseapp.com',
  projectId: 'uniclubproject',
  storageBucket: 'uniclubproject.appspot.com',
  messagingSenderId: '522814460221',
  appId: '1:522814460221:web:d679d7d9c0da7c31e67554',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
