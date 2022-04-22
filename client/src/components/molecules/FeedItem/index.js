import React from 'react';

import ThumbsUp from '@assets/icons/thumbsUp.svg';
import ThumbsDown from '@assets/icons/thumbsDown.svg';

import './styles.css';

const FeedItem = ({ photoUrl, name, status, updateThumbs, id }) => {
  return (
    <div className='feeditem-container'>
      <img src={photoUrl} alt={name} loading='lazy' className='photo-url' />

      <div className='content-container'>
        <h2 className='username'>{name}</h2>

        <p className='user-status'>{status}</p>
      </div>

      <div className='reactions-container'>
        <img
          className='thumbsup-icon'
          src={ThumbsUp}
          alt='Thumbs Up'
          onClick={() => updateThumbs('thumbsUp', id)}
        />

        <img
          className='thumbsup-icon'
          src={ThumbsDown}
          alt='Thumbs Down'
          onClick={() => updateThumbs('thumbsDown', id)}
        />
      </div>
    </div>
  );
};

export default FeedItem;
