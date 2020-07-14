import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { ReactComponent as Arrow} from '../assets/arrow-back-outline.svg';

// API functions
import { GetCountry } from '../components/Api';

// Helper functions
import { formatNumber } from '../components/Helper';

class CountryDetails extends React.Component {
  constructor(props) {
    super(props);
    this.getBorderCountries = this.getBorderCountries.bind(this);
    this.state = {
      country: this.props.location.state.country,
      borderCountriesArr: []
    }
  }

  componentDidMount() {
    this.getBorderCountries(this.state.country.borders);
  }

  componentDidUpdate(prevProps) {
    // If country has changed, 
    if(this.props.location.state.country !== prevProps.location.state.country) {
      // set the country state with new information,
      this.setState({
        country: this.props.location.state.country,
      });
      // and get info of new border countries
      this.getBorderCountries(this.props.location.state.country.borders);
    }
  }

  // Get information of every border country and store it in state
  // Params: borders -> array
  getBorderCountries = (borders) => {
    // 1. Create empty array
    let promiseArray = [];
    borders.forEach((border) => {
      // 2. Fetch data and add them to array
      promiseArray.push(GetCountry(border))
    })
  
    // 3. Resolve overal promise
    return Promise.all(promiseArray).then((values) => {
      this.setState({
        borderCountriesArr: values,
      })
    });
  };

  render() {
    const { 
      flag, 
      name, 
      nativeName, 
      population, 
      region,
      subregion,
      capital,
      topLevelDomain,
      currencies,
      languages
    } = this.state.country;

    return (
    <div className="page">
      <div className="container">
        <Link className="btn btn--back" to="/">
         <Arrow /> Back
        </Link>
        <div className="page__details">           
          <img src={flag} alt={name} />
          <div className="info">
            <div className="row">
              <h1>{name}</h1>  
            </div>
            <div className="row row--flex">
              <div className="column">
                <p><span>Native Name:</span> {nativeName}</p>
                <p><span>Population:</span> {formatNumber(population)}</p>
                <p><span>Region:</span> {region}</p>
                <p><span>Sub Region:</span> {subregion}</p>
                <p><span>Capital:</span> {capital}</p>
              </div>
              <div className="column">
                <p><span>Top Level Domain: </span> {topLevelDomain.map((top) => top)}</p>
                <p>
                <span>Currencies: </span> 
                {/* Separate list of currencies by comma */}
                {
                  currencies.map((currency, index) => (index ? ', ' : '') + currency.name)
                }
                </p>
                <p>
                <span>Languages: </span>
                {/* Separate list of languages by comma */}
                {
                  languages.map((language, index) => (index ? ', ' : '') + language.name)
                }
                </p>
              </div>
            </div>
            <div className="row row--flex flex--baseline">
              <h2>Border Countries:</h2>
              <div className="borders">
                {this.state.borderCountriesArr.length > 0 && this.state.borderCountriesArr.map(country => (
                    <Link
                    className="btn"
                      key={country.numericCode}
                      to={{
                        pathname: `${country.name}`,
                        state: { country }
                    }}>{country.name}</Link>
                ))}
              </div>
            </div>
        </div>
        </div>
      </div>
    </div>
    )
  }
}

// PropTypes
CountryDetails.propTypes = {
  state: PropTypes.object
}

export default withRouter(CountryDetails) 