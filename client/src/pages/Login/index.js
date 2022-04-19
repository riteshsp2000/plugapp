import React from 'react';

import LoginScreenImg from '@assets/imgs/loginScreen.png';
import './styles.css';

const Login = () => {
  return (
    <div className='primary-container'>
      <div className='img-container'>
        <img src={LoginScreenImg} alt='Login Screen Image' loading='lazy' className='login-img' />
      </div>

      <div className='content-container'>
        <h2 className='title'>PlugApp</h2>
        <p className='content'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever
        </p>
      </div>
    </div>
  );
};

export default Login;
