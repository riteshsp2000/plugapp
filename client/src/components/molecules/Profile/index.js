import React from 'react';

import { useAuth } from '@store/contexts';

import './styles.css';

const Profile = () => {
  const [state] = useAuth();
  console.log(state);

  return (
    <div className='profile-container'>
      <div className='details'>
        <img className='profile-image' src={state.user.photoURL} alt={state.user.name} />

        <h2 className='profile-name'>{state.user.name}</h2>
      </div>
    </div>
  );
};

export default Profile;
