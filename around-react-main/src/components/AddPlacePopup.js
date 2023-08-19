import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  //const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const nameChange = (event) => {
    setName(event.target.value);
  };

  const linkChange = (event) => {
    setLink(event.target.value);
  };

  function handleSubmit(e) {
    // Prevent the browser from navigating to the form address
    e.preventDefault();

    onAddPlaceSubmit({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name='new-card'
      title='New card'
      buttonText='Create'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id='title-input'
        type='text'
        name='card-title'
        placeholder='Title'
        className='form__input form__input_type_place-name'
        required
        minLength='1'
        maxLength='30'
        onChange={nameChange}
      />
      <span className='form__input-error' id='title-input-error'></span>
      <input
        id='url-input'
        type='url'
        name='link'
        placeholder='Image link'
        className='form__input form__input_type_place-url'
        required
        onChange={linkChange}
      />
      <span className='form__input-error' id='url-input-error'></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
