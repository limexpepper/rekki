const axios = require('axios'); 
const path = require('path');
const dotenv = require('dotenv');
const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });
const apiKey=process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

const performTextSearch = async (text) => {
    console.log('inside performTextSearch')
    const searchQuery = text; 
    try {
      const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&key=${apiKey}`;
      const response = await axios.get(apiUrl);
  
      if (response.data.status === 'OK') {
        const places = response.data.results; 
        // console.log(places);
        return places;
      } else {
        console.error('Text search request failed:', response.data.status);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  // performTextSearch('cafes in new york');
  // performTextSearch('東京のカツ丼'); // katsu don in tokyo

module.exports = performTextSearch;