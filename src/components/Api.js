// Get all countries from API
// No params
export const GetAllCountries = () => {
  // Fetch all countries
  const fetchData = fetch("https://restcountries.eu/rest/v2/all")
    .then(res => res.json())
    .then(
      (data) => {
        return data;
      },
      (error) => {
        return error;
      }
    )
  return fetchData
}

// Fetch countries by region
// Params: region
export const FilterRegionAPI = (region) => {
  // Fetch data for selected region
  const fetchData = fetch(`https://restcountries.eu/rest/v2/region/${region}`)
    .then(res => res.json())
    .then(
      (data) => {
        return data;
      },
      (error) => {
        return error;
      }
    )
  return fetchData;
}

// Fetch information by country
// Params: country
export const GetCountry = (country) => {
  const fetchData = fetch(`https://restcountries.eu/rest/v2/alpha/${country}`)
    .then(response => response.json());
  return fetchData;
}
