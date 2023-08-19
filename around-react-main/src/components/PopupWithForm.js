import React from 'react';

function PopupWithForm({
  isOpen,
  onClose,
  onSubmit,
  name,
  title,
  buttonText,
  children,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_open' : ''}`}>
      <div className='popup__box'>
        <button
          type='button'
          className='popup__close-button'
          aria-label='close'
          onClick={onClose}
        ></button>

        <h2 className='popup__title'>{title}</h2>
        <form className='popup__form' name={name} onSubmit={onSubmit}>
          {children}

          <button type='submit' className='popup__submit-button'>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
