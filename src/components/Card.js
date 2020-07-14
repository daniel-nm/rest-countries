import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import '../styles/components/card.scss';

// Subcomponents
import CardHeader from './subcomponents/CardHeader';
import CardBody from './subcomponents/CardBody';

// Helper classes
import { capitalize } from './Helper';

const Card = ({ countries, country }) => {
  // Format country value from input -> to lower case and then capitalize the first letter of every word
  const formattedCountry = capitalize(country.toLowerCase());
  
  if (countries.length > 0) {
    return (
      <div className="countriesCards">
        {
        countries.filter(el => el.name.includes(formattedCountry)).map(filteredCountry => (
          // Link to country details
          // Props: state -> country information
          <Link className="card" key={filteredCountry.numericCode} to={{
            pathname: `${filteredCountry.name}`,
            state: { country: filteredCountry }
            }}>
            <CardHeader img={filteredCountry.flag} name={filteredCountry.name} />
            <CardBody name={filteredCountry.name} population={filteredCountry.population} region={filteredCountry.region} capital={filteredCountry.capital} />
          </Link>
        ))
        }
      </div>
    )
  } else {
    return (
      <div className="countriesCard">
        <p>No countries found.</p>
      </div>
    )
  }
  
}

Card.propTypes = {
  countries: PropTypes.array.isRequired,
  country: PropTypes.string
}

export default Card
