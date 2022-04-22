import React, { useState } from 'react';

import { doc, updateDoc } from 'firebase/firestore';
import { useFirebase } from '@config/firebase';
import { useAuth } from '@store/contexts';

import { Modal } from '@components';

import EditIcon from '@assets/icons/edit.svg';
import './styles.css';

const Profile = () => {
  const { db } = useFirebase();
  const [state] = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(state.user?.status);

  const closeModal = () => setShowModal(false);
  const trueModal = () => setShowModal(true);

  const updateStatus = async () => {
    const userRef = doc(db, 'users', state.user?.id);
    await updateDoc(userRef, {
      status,
    });
  };

  return (
    <div className='profile-container'>
      <div className='details'>
        {state.user ? (
          <img className='profile-image' src={state.user?.photoURL} alt={state.user?.name} />
        ) : (
          <div className='img-container' />
        )}

        <h2 className='profile-name'>{state.user?.name || 'Loading...'}</h2>

        <div className='profile-item-container'>
          <div className='status-title-container'>
            <h4 className='status'>Status</h4>
            <img src={EditIcon} alt='icon' loading='lazy' onClick={trueModal} />
          </div>
          <p className='status-content'>{state.user?.status || 'Loading...'}</p>
        </div>
      </div>

      <Modal visible={showModal} onClose={closeModal}>
        <h4 style={{ marginBottom: '10px' }}>Update Status</h4>
        <textarea
          rows={5}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className='textarea'
        />

        <div className='button-container'>
          <button className='button' onClick={closeModal}>
            Cancel
          </button>
          <button className='button' onClick={updateStatus}>
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
