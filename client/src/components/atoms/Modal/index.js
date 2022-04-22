import React from 'react';

import './styles.css';

const Modal = ({ children, visible, onClose }) => {
  return (
    <>
      {visible && (
        <div className='overlay' onClick={onClose}>
          <div className='modal-container' onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
