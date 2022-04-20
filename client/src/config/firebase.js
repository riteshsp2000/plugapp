import { initializeApp } from 'firebase/app';

const configureFirebase = async () => {
  if (process.env.NODE_ENV === 'production') {
    const response = await fetch('/__/firebase/init.json');
    const config = await response.json();
    initializeApp(config);
  } else {
    const firebaseConfig = {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
    };

    initializeApp(firebaseConfig);
  }
};

export default configureFirebase;
