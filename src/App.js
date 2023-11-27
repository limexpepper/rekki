import React, { useState, useRef } from 'react';
//import Results from './Results';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchedData, setFetchedData] = useState(null); 
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission
  //const inputRef = useRef(null);

  const fetchData = async (searchTerm) => {
    console.log('Fetching data');
    try {
      const response = await fetch('http://localhost:3001/translate-and-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchTerm: searchTerm,
          targetLanguage: 'ja', // Replace with your desired target language code
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      console.log('Data from backend:', data);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setFormSubmitted(true);
    console.log('Perform search for:', searchTerm);
    const data = await fetchData(searchTerm); // Call the API to fetch data with the search term
    setFetchedData(data);
    setSearchTerm(''); // Clearing the search term after search button is clicked
    //inputRef.current.focus(); // Set focus on the input field after clicking the search button
  };

  return (
    <div className="App">
      <p>Rekki</p>
      <p>Google like a Japanese, without using Japanese</p>
      {!formSubmitted ? ( 
        
        <form onSubmit={handleSearch}>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Try 'katsu in tokyo'"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              // ref={inputRef} 
            />
            <button type="submit" className="submit-btn">
              S
            </button>
          </div>
        </form>
      ) : (
        fetchedData && (
          <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
        )
      )}
    </div>
  );
}

export default App;