import React from 'react';
import PropTypes from 'prop-types';
import {ReactComponent as SearchOutline} from '../assets/search-outline.svg';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handles changes in search input field
  handleChange(e) {
    this.props.onSearchChange(e.target.value);
  }

  // Prevent default form submission
  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { value } = this.props;
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <label className="search__label" htmlFor="country">Search for a country</label>
          <input 
            className="search__input" 
            type="search" 
            name="country" 
            id="country" 
            placeholder="Search for a country..."
            onChange={this.handleChange}
            value={value}
            />
          <SearchOutline />
        </form>
      </div>
    )
  }
}

// PropTypes
Search.propTypes = {
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  value: PropTypes.string
}

export default Search;
