import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { api } from '../utils/Api';
import App from '../components/App';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const nameChange = (event) => {
    setName(event.target.value);
  };

  const descriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Subscription to the context
  const currentUser = React.useContext(CurrentUserContext);

  function handleSubmit(e) {
    // Prevent the browser from navigating to the form address
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  // After loading the current user from the API
  // their data will be used in managed components.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name='edit'
      title='Edit profile'
      buttonText='Save'
    >
      <input
        className='form__input form__input_type_profile-name'
        type='text'
        id='name-input'
        name='fullName'
        placeholder='Full Name'
        minLength='2'
        maxLength='40'
        required
        defaultValue={name}
        onChange={nameChange}
      />

      <span className='form__input-error' id='name-input-error'></span>

      <input
        className='form__input form__input_type_profile-class'
        type='text'
        id='class-input'
        name='className'
        placeholder='Class'
        minLength='2'
        maxLength='40'
        required
        defaultValue={description}
        onChange={descriptionChange}
      />
      <span className='form__input-error' id='class-input-error'></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
