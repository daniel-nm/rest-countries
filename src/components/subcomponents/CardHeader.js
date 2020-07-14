import React from 'react';
import PropTypes from 'prop-types';

const CardHeader = ({ img, name }) => {
  return (
    <div className="card__header">
        <img className="card__img" src={img} alt={name}/>
    </div>
  )
}

CardHeader.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string
}

export default CardHeader
