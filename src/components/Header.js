import React from 'react';
import PropTypes from 'prop-types';
import DarkModeIcon from './DarkModeIcon';

const Header = (props) => {
  // Handle click on dark mode button 
  const handleClick = () => {
    props.onChangeTheme();
  }

  return (
    <header className="header">
      <div className="container">
        <h1 className="header__title">Where in the world?</h1>
        <div className="header__mode">
          <button onClick={handleClick}>
            <DarkModeIcon /> Dark Mode
          </button>
        </div>
      </div>
    </header>
  )
}

// PropTypes
Header.propTypes = {
  handleClick: PropTypes.func
}

export default Header;
