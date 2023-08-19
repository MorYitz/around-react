import React, { useState, useEffect } from 'react';

function PopupWithImage({ isOpen, onClose, card }) {
  return (
    <div
      className={`popup popup_type_image-preview ${isOpen ? 'popup_open' : ''}`}
    >
      <div className='popup__box popup__box_type_image-preview'>
        <button
          className='popup__close-button popup__close-button_type_image-preview'
          type='button'
          aria-label='close'
          onClick={onClose}
        ></button>
        <img className='popup__image' src={card.link} alt={card.name} />
        <p className='popup__caption'>{card.name}</p>
      </div>
    </div>
  );
}

export default PopupWithImage;
