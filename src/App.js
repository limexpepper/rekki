import React, { useState, useRef } from "react";
import "./App.css";
// import bear from "./pinkbear.jpg";
// import searchIcon from "./search.png";
import { ReactComponent as SearchIcon } from "./search.svg";
import { ReactComponent as Bear } from "./bear.svg";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission
  //const inputRef = useRef(null);

  const fetchData = async (searchTerm) => {
    console.log("Fetching data");
    try {
      const response = await fetch(
        "http://localhost:3001/translate-and-search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchTerm: searchTerm,
            targetLanguage: "ja", // Replace with your desired target language code
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      console.log("Data from backend:", data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    console.log("Perform search for:", searchTerm);
    const data = await fetchData(searchTerm);
    console.log("data in handle search: " + data);
    setFetchedData(data);
    setSearchTerm("");
  };

  const renderBusinessCards = () => {
    return <div className="card">No business data available</div>;
    // const array = Object.values(fetchedData);
    // if (fetchedData && Array.isArray(array)){
    //     let dataDisplay = array.map((object) => {
    //       const { name } = object;
    //       return (
    //         <div className="card">
    //          <h3>${name}</h3>

    //       </div>
    //       )
    //     })
    // } else {
    //   return <div className="card">No business data available</div>;
    // }
  };

  return (
    <div className="App">
      <div className="container">
      <p className="sticky">Rekki</p>

      {
        !formSubmitted ? (
          <>
            <div className="content">
              <p>Google like a Japanese, without using Japanese</p>
              <form onSubmit={handleSearch}>
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Try 'katsu in tokyo'"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="submit" className="submit-btn">
                    <SearchIcon className="searchIcon" />
                    {/* <img src={searchIcon} className="searchIcon" /> */}
                  </button>
                </div>
              </form>
            </div>
            <>
              {/* <img src={bear} className="bear" /> */}
              <Bear className="bear" />
                
            </>
          </>
        ) : (
          <div className="cards">
            {console.log(fetchedData)}
            {renderBusinessCards()}
          </div>
        )
        
        // (
        //   fetchedData && (
        //     <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
        //   )
        // )
      }
      </div>
    </div>
  );
}

export default App;
