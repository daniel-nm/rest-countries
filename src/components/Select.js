import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.regions = [
      {id: 1,name: "Africa"},
      {id: 2,name: "Americas"},
      {id: 3,name: "Asia"},
      {id: 4,name: "Europe"},
      {id: 5,name: "Oceania"},
    ];
  }

  // Hangles changes in select element
  handleChange(e) {
    this.props.onFilterChange(e.target.value);
  }

  render() {
    const { selected } = this.props;
    return(
      <div className="select">
        <select 
          className="select__input" 
          onChange={this.handleChange}
          value={selected}
        >
          <option value="default" disabled>Filter by Region</option>
          {this.regions.map((region) => (
            <option key={region.id} value={region.name}>{region.name}</option>
          ))}
        </select>
    </div>
    )
  }
}

// Proptypes
Select.propTypes = {
  handleChange: PropTypes.func,
  selected: PropTypes.string
}

export default Select
