import React from 'react';
import PropTypes from 'prop-types';

// Helper functions
import { formatNumber } from '../Helper';

const CardBody = ({name, population, region, capital}) => {
  return (
    <div className="card__body">
      <h2 className="card__title">{name}</h2>
      <p className="card__field"><span className="card__label">Population:</span> {formatNumber(population)}</p>
      <p className="card__field"><span className="card__label">Region:</span> {region}</p>
      <p className="card__field"><span className="card__label">Capital:</span> {capital}</p>
    </div>
  )
}

// PropTypes
CardBody.propTypes = {
  name: PropTypes.string,
  population: PropTypes.number,
  region: PropTypes.string,
  capital: PropTypes.string
}

export default CardBody
