import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import PropTypes from 'prop-types';

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const uid = user.uid;
        setCurrentUser({ uid, ...userDoc.data() });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const register = async (email, password, firstName, lastName, birthDate) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          firstName,
          lastName,
          birthDate,
          email,
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          lastLoginAt: user.metadata.lastSignInTime,
          createdAt: user.metadata.creationTime,
        });
        const newUserDoc = await getDoc(doc(db, "users", user.uid));
        const uid = user.uid;
        setCurrentUser({ uid, ...newUserDoc.data() });
      }
      return user;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          firstName: userCredential._tokenResponse.firstName,
          lastName: userCredential._tokenResponse.lastName,
          birthDate: "1990-04-11", 
          email: user.email,
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          lastLoginAt: user.metadata.lastSignInTime,
          createdAt: user.metadata.creationTime,
        });
        const newUserDoc = await getDoc(doc(db, "users", user.uid));
        const uid = user.uid;
        setCurrentUser({ uid, ...newUserDoc.data() });
      }

      return user;
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("Signed out");
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        googleSignIn,
        logOut,
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
