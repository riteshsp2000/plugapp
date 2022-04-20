import React from 'react';
import ReactDOM from 'react-dom';

import configureFirebase from '@config/firebase';

import App from './pages/App';
import Root from './config/Root';

import './styles.css';

configureFirebase()
  .then(() => {
    ReactDOM.render(
      <Root>
        <App />
      </Root>,
      document.querySelector('#root'),
    );
  })
  .catch((error) => console.error('Firebase Initialisation Error'));
