import React, { useEffect, useState, createContext, useContext } from 'react';

// Libraries
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

let instance = null;

export const getFirebase = async () => {
  if (typeof window !== 'undefined') {
    if (instance) return instance;

    if (process.env.NODE_ENV === 'production') {
      const response = await fetch('/__/firebase/init.json');
      const config = await response.json();
      instance = initializeApp(config);
      return instance;
    }

    // Firebase web config
    // const config = {
    //   type: process.env.type,
    //   projectId: process.env.projectId,
    //   privateKeyId: process.env.privateKeyId,
    //   privateKey: process.env.privateKey,
    //   clientEmail: process.env.clientEmail,
    //   clientId: process.env.clientId,
    //   authUri: process.env.authUri,
    //   tokenUri: process.env.tokenUri,
    //   authProviderX509CertUrl: process.env.authProviderX509CertUrl,
    //   clientX509CertUrl: process.env.clientX509CertUrl,
    // };

    const config = {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
    };

    instance = initializeApp(config);
    return instance;
  }

  return null;
};

export const FirebaseContext = createContext({ firebase: null, isInitialised: false, db: null });

const FirebaseProvider = ({ children }) => {
  const [isInitialised, setIsInitialised] = useState(false);
  const [firebase, setFirebase] = useState(null);
  const [auth, setAuth] = useState(null);
  const [db, setDb] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const firebaseInstance = await getFirebase();
      setFirebase(firebaseInstance);
      if (firebaseInstance) {
        setIsInitialised(true);
        setDb(getFirestore(firebaseInstance));
        setAuth(getAuth(firebaseInstance));
      }
    };

    fetchData();
  }, []);

  return (
    <FirebaseContext.Provider value={{ firebase, isInitialised, db, auth }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);

  if (!context) throw new Error('useFirebase must be used within a FirebaseProvider');

  return context;
};

export default FirebaseProvider;
