import React from 'react';
import ReactDOM from 'react-dom';

import App from './pages/App';
import Root from './config/Root';

import './styles.css';

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.querySelector('#root'),
);
