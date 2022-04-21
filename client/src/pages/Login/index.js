import React from 'react';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { query, collection, getDocs, addDoc, where } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import { useFirebase } from '@config/firebase';

import LoginScreenImg from '@assets/imgs/loginScreen.png';
import './styles.css';

const Login = () => {
  const history = useHistory();
  const { db, auth } = useFirebase();
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, 'users'), where('uid', '==', user.uid));
      const existingUsers = await getDocs(q);
      if (existingUsers.docs.length === 0) {
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      }

      history.push('/');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className='primary-container'>
      <div className='img-container'>
        <img src={LoginScreenImg} alt='Login Screen Image' loading='lazy' className='login-img' />
      </div>

      <div className='content-container'>
        <h2 className='title'>PlugApp</h2>
        <button onClick={signInWithGoogle}>Login with Google</button>
        <p className='content'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever
        </p>
      </div>
    </div>
  );
};

export default Login;
