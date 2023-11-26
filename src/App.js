import React, { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  // Function to fetch data from the backend
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
      // Further logic to handle fetched data can be added here
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log('Perform search for:', searchTerm);
    await fetchData(searchTerm); // Call the API to fetch data with the search term
    setSearchTerm(''); // Clearing the search term after search button is clicked
    inputRef.current.focus(); // Set focus on the input field after clicking the search button
  };


  return (
    <div className="App">
      <form onSubmit={handleSearch}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Try 'katsu in tokyo'"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={inputRef} // Ref for input element
          />
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
      <p>Bare bones app.</p>
    </div>
  );
}

export default App;






// import React, { useEffect } from 'react';
// import './App.css';

// function App() {
//   // Function to fetch data from the backend
//   const fetchData = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/google-places?query=pudding');
//       if (!response.ok) {
//         throw new Error('Network response was not ok.');
//       }
//       const data = await response.json();
//       console.log('Data from backend:', data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   // Trigger the API call when the component mounts
//   useEffect(() => {
//     fetchData();
//   }, []); // Empty dependency array to run this effect only once, similar to componentDidMount

//   return (
//     <div className="App">
//       <p>Bare bones app.</p>
//     </div>
//   );
// }

// export default App;