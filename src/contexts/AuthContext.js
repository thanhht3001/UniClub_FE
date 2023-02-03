import { createContext, useContext, useEffect, useState } from 'react';
import {
  // signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  // createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from '@firebase/auth';
import { auth } from 'utils/dataLayer/firebase';
// import { auth } from 'utils/dataLayer/firebase';

const AuthContext = createContext({
  currentUser: null,
  // login: () => Promise,
  // register: () => Promise,
  logout: () => Promise,
  signInWithGoogle: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // function login(email, password) {
  //   return signInWithEmailAndPassword(auth, email, password);
  // }

  function signInWithGoogle() {
    const provide = new GoogleAuthProvider();
    return signInWithPopup(auth, provide);
  }

  function logout() {
    return signOut(auth);
  }

  // function register(email, password) {
  //   return createUserWithEmailAndPassword(auth, email, password);
  // }

  const value = {
    currentUser,
    // login,
    logout,
    // register,
    signInWithGoogle,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
