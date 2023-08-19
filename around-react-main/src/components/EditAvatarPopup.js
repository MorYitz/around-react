import React, { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInput = useRef('');

  // Subscription to the context

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
  }
  // After loading the current user from the API
  // their data will be used in managed components.
  React.useEffect(() => {
    avatarInput.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Change Profile Picture'
      buttonText='Save'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className='form__input form__input_type_change-avatar'
        type='url'
        id='avatar-input'
        name='avatar'
        placeholder=''
        minLength='2'
        required
        ref={avatarInput}
      />
      <span className='form__input-error' id='avatar-input-error'></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
