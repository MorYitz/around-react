import React, { useState, useEffect } from 'react';
import Card from './Card.js';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className='main'>
      <section className='profile'>
        <div className='profile__avatar' onClick={props.onEditAvatarClick}>
          <img
            className='profile__image'
            src={currentUser.avatar}
            alt='avatar'
          />
          <div className='profile__image-change'></div>
        </div>

        <div className='profile__info'>
          <h1 className='profile__info-title'>{currentUser.name}</h1>
          <button
            className='profile__edit-button'
            onClick={props.onEditProfileClick}
            type='button'
            aria-label='edit button'
          ></button>
          <p className='profile__info-class'>{currentUser.about}</p>
        </div>
        <button
          className='profile__add-button'
          onClick={props.onAddPlaceClick}
          type='button'
          aria-label='add button'
        ></button>
      </section>
      {
        <section className='elements'>
          <ul className='elements__list'>
            {props.cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            ))}
          </ul>
        </section>
      }
    </main>
  );
}

export default Main;
