import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {ReactComponent as Loader} from '../src/assets/reload-outline.svg'
import './styles/App.scss';

// API functions
import { GetAllCountries, FilterRegionAPI} from './components/Api';

// Components
import Header from './components/Header';
import Search from './components/Search';
import Select from './components/Select';
import Card from './components/Card';

// Pages
import CountryDetails from './pages/CountryDetails';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      country: "",
      selected: "default",
      isLoaded: false,
      activeTheme: "light"
    }

    // Local storage
    this.store = typeof localStorage === 'undefined' ? null : localStorage;  

    // Methods
    this.setCountry = this.setCountry.bind(this);
    this.filterRegion = this.filterRegion.bind(this);
    this.resetLoader = this.resetLoader.bind(this);
    this.resetError = this.resetError.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
  };

  componentDidMount() {
    // Fetch all countries
    const allCountries = GetAllCountries();
    allCountries.then((data) => {
      this.setState({
        countries: data,
        isLoaded: true
      })
    })
    
    // Retrieve theme from local storage and set it. If none, set default to light
    if (this.store) {
      this.setState({
        activeTheme: this.store.getItem('theme') || 'light'
      });
    }
    localStorage.setItem("theme", this.state.activeTheme);
  }

  componentDidUpdate() {
    // Get body element - will need it to apply the dark theme
    const body = document.querySelector("body");
    
    // If localstorage, set theme
    if (this.store) {
      this.store.setItem("theme", this.state.activeTheme);
    }
    
    // If theme === dark, add class. Otherwise, remove it.
    if (this.store.theme === 'dark') {
      body.classList.add("dark");
    }
    else {
      body.classList.remove("dark");
    }
  }

  // Reset loader to default value
  resetLoader() {
    this.setState({
      isLoaded: false
    });
  }

  // Reset error to default value
  resetError() {
    this.setState({
      error: null
    });
  }

  // Set country value
  // Params: country => country typed in search field
  setCountry(country) {
    this.setState({
      country
    });
  }

  // Filter countries by region
  // Params: selected => Region selected from dropdown menu
  filterRegion(selected) {
    // Reset loader and error states
    this.resetLoader();
    this.resetError();    

    // Fetch countries by region
    const countriesPerRegion = FilterRegionAPI(selected);
    countriesPerRegion.then((data) => {
      this.setState({
        countries: data,
        isLoaded: true,
        selected
      });
    })
  }

  // Reset region filter
  resetFilter() {
    // Reset loader and error states
    this.resetLoader();
    this.resetError(); 

    // Fetch all countries
    const allCountries = GetAllCountries();
    allCountries.then((data) => {
      this.setState({
        countries: data,
        isLoaded: true,
        selected: "default"
      });
    })
  }

  // Change theme
  changeTheme() {
    this.setState({
      activeTheme: this.state.activeTheme === 'light' ? 'dark' : 'light'
    })
  }

  // Render method
  render() {
    const {isLoaded, countries, country} = this.state;
    return (
      <React.Fragment>
        <Header onChangeTheme={this.changeTheme} />
        <main>
        {/* 
          If countries are not loaded, show loader screen 
        */}
          {!isLoaded &&
          <React.Fragment>
            <div className="is-loading">
              <p>Loading countries </p><Loader />
            </div>
          </React.Fragment>
          }
          {/* 
            Show countries when loaded
          */}
          <section className="countries">
            <div className="container">
              <Router>
                <Route exact path="/">
                  <section className="fields">
                    <Search value={this.state.country} onSearchChange={this.setCountry} />
                    <Select selected={this.state.selected} onFilterChange={this.filterRegion} />
                  </section>

                  {/* Reset filter and select all countries */}
                  <div className="is-filtered">
                    <button onClick={this.resetFilter}>Reset filter: {this.state.selected === 'default' ? 'n/a' : this.state.selected}</button>
                  </div>
                  
                  <Card country={country} countries={countries} />
                </Route>
                <Route exact path="/:id">
                  <CountryDetails />
                </Route>
              </Router>
            </div>
          </section>
        </main>
      </React.Fragment>
    )  
  }
}

export default App;
