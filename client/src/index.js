import React from 'react';
import ReactDOM from 'react-dom';

import FirebaseProvider from '@config/firebase';

import App from './pages/App';
import Root from './config/Root';

import './styles.css';

ReactDOM.render(
  <FirebaseProvider>
    <Root>
      <App />
    </Root>
  </FirebaseProvider>,
  document.querySelector('#root'),
);
