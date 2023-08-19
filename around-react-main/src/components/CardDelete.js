import React from 'react';
import PopupWithForm from './PopupWithForm';

function CardDeletePopup({ isOpen, onClose, onSubmit, card }) {
  return (
    <PopupWithForm
      name='new-card'
      title='Delete card'
      buttonText='Delete'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      card={card}
    ></PopupWithForm>
  );
}

export default CardDeletePopup;
