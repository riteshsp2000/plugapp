import React, { useState } from 'react';

import { useAuth } from '@store/contexts';
import { Modal } from '@components';

import EditIcon from '@assets/icons/edit.svg';
import './styles.css';

const Profile = () => {
  const [state] = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('');

  return (
    <div className='profile-container'>
      <div className='details'>
        <img className='profile-image' src={state.user.photoURL} alt={state.user.name} />

        <h2 className='profile-name'>{state.user.name}</h2>

        <div className='profile-item-container'>
          <div className='status-title-container'>
            <h4 className='status'>Status</h4>
            <img src={EditIcon} alt='icon' loading='lazy' onClick={() => setShowModal(true)} />
          </div>
          <p className='status-content'>
            Lorem Ipsum Lorem IpsumLorem Ipsum IpsumLorem IpsumIpsumLorem IpsumIpsumLorem
            IpsumIpsumLorem IpsumIpsumLorem IpsumIpsumLorem Ipsum
          </p>
        </div>
      </div>

      <Modal visible={showModal} onClose={() => setShowModal(false)}>
        <h4 style={{ marginBottom: '10px' }}>Update Status</h4>
        <textarea
          rows={5}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className='textarea'
        />

        <div className='button-container'>
          <button className='button' onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className='button'>Save</button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
