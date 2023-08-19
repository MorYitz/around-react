import React, { useState, useEffect } from 'react';
import trash from '../images/Trash.svg';
import like from '../images/like.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);
  function handleClick() {
    onCardClick(card);
  }
  function handleDelete() {
    onCardDelete(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }

  // Checking if the current user is the owner of the current card
  const isOwn = card.owner._id === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'
  }`;
  // Check if the card was liked by the current user
  const isLiked = card.likes.some((user) => user._id === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  const cardLikeButtonClassName = `element__like-button${
      isLiked ? ' element__button_liked' : ''
  }`;

  return (
    <li className='card_in_list'>
      <img
        onClick={handleDelete}
        src={trash}
        alt='trash button'
        className={cardDeleteButtonClassName}
      />

      <img
        onClick={handleClick}
        src={card.link}
        alt='user card'
        className='element__image'
      />
      <div className='element__group'>
        <h2 className='element__name'>{card.name}</h2>
        <div className='element__likes'>
          <button
            type='button'
            // style={{ backgroundImage: `url(${like})` }}
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
          ></button>
          <div className='element__like'>{card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
