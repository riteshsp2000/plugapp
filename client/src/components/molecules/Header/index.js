import React from 'react';

import { Link } from 'react-router-dom';

import { signOut } from 'firebase/auth';
import { useFirebase } from '@config/firebase';

import LogoutSvg from '@assets/icons/logout.svg';
import './styles.css';

const LINKS = [
  {
    href: '/',
    name: 'feed',
  },
  {
    href: '/favourites',
    name: 'favourites',
  },
];

const Header = () => {
  const { auth } = useFirebase();

  const signUserOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='header-container'>
      <div className='width-container'>
        <h2 className='title'>PlugApp</h2>

        <div className='link-container'>
          {LINKS.map(({ href, name }) => (
            <Link key={name} to={href} className='link'>
              {name}
            </Link>
          ))}
        </div>

        <img onClick={signUserOut} src={LogoutSvg} alt='Logout' className='logout-icon' />
      </div>
    </div>
  );
};

export default Header;
