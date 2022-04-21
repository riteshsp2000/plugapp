import React from 'react';
import ReactDOM from 'react-dom';

import FirebaseProvider from '@config/firebase';
import App from '@pages/App';

import { AuthProvider } from '@store/contexts';

import './styles.css';

ReactDOM.render(
  <FirebaseProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </FirebaseProvider>,
  document.querySelector('#root'),
);
