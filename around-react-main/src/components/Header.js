import React from 'react';
import logo from '../images/header.svg';

function Header() {
  return (
    <header className='header'>
      <img src={logo} alt='header-logo' className='header__image' />
    </header>
  );
}

export default Header;
