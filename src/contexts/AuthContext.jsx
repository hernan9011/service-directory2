// src/contexts/AuthContext.js
import React, {  useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import PropTypes from 'prop-types';

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const register = async (email, password) => {
    return await createUserWithEmailAndPassword( auth, email, password);
  };
 
  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };
 
  const loginWithGoogle = async () => {
    const responseGoogle = new GoogleAuthProvider();
    return await signInWithPopup(auth, responseGoogle);
  };

  const logout = async () => {
    return await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        register,login,
        loginWithGoogle,logout,
        currentUser,
      }}
    >
       {!loading && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
