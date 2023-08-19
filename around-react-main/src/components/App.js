import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import PopupWithImage from './PopupWithImage.js';
import { api } from '../utils/Api.js';
import '../index.css';
import CardDelete from './CardDelete';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
{
}
function App() {
  const [currentUser, setcurrentUser] = useState('');
  useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => {
        setcurrentUser(userInfo);
      })
      .catch((err) => console.log(err));
  }, []);
  // Popups
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
  const [isCardDeleteOpen, setIsCardDeleteOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  useEffect(() => {
    // cards
    api
      .getCards()
      .then((cards) => {
        console.log('cards = ');
        console.log(cards);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    // cards
    api
      .getCards()
      .then((cards) => {
        console.log('cards = ');
        console.log(cards);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);
  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    // Send a request to the API and getting the updated card data
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
        )
      );
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id);

    const newCards = cards.filter((row) => {
      return row._id != card._id;
    });
    setCards(newCards);
  }

  // Edit Profile

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .addCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {});
    sleep(sleepTimeMS);
  };

  const handleCardDeleteClick = (card) => {
    console.log('card');
    console.log(card);
    // sleep(15000);
    setIsCardDeleteOpen(true);
    setSelectedCard(card);
  };

  const handleUpdateUser = (user) => {
    api
      .editProfile(user.name, user.about)
      .then((res) => {
        let newUser = currentUser;
        newUser.name = user.name;
        newUser.about = user.about;
        setcurrentUser(newUser);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {});
  };
  const handleUpdateAvatar = (user) => {
    api
      .editAvatar(user.avatar)
      .then((res) => {
        let newUser = currentUser;
        newUser.avatar = user.avatar;
        setcurrentUser(newUser);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {});
  };

  const handleCardPopupClick = () => {
    setIsCardPopupOpen(true);
  };

  const handleCardClick = (card) => {
    console.log('card');
    console.log(card);
    // sleep(15000);
    setIsCardPopupOpen(true);
    setSelectedCard(card);
  };

  const sleepTimeMS = 150;

  function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {}
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardPopupOpen(false);
    setIsCardDeleteOpen(false);
    setSelectedCard({});
  };
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className='page'>
          <Header />
          <Main
            cards={cards}
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />

          <CardDelete
            card={selectedCard}
            isOpen={isCardDeleteOpen}
            onClose={closeAllPopups}
          />

          <PopupWithImage
            card={selectedCard}
            isOpen={isCardPopupOpen}
            onClose={closeAllPopups}
          />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
