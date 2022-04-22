import React from 'react';

import { Profile } from '@components';
import './styles.css';

const Layout = ({ children }) => {
  return (
    <div className='layout-container'>
      <div className='first-row'>{children}</div>
      <div className='second-row'>
        <h4 style={{ margin: '10px 0' }}>Profile</h4>
        <Profile />
      </div>
    </div>
  );
};

export default Layout;
