import React, { useState } from "react";
import "./App.css";
import { ReactComponent as SearchIcon } from "./search.svg";
import { ReactComponent as Bear } from "./bear.svg";
import { ReactComponent as Katsu } from "./katsu.svg";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false); 
  // const [translatedTerm, setTranslatedTerm] = useState("oh what even");


  const fetchData = async (searchTerm) => {
    console.log("Fetching data");
    try {
      const response = await fetch(
        "/translate-and-search",//"http://localhost:3001/translate-and-search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchTerm: searchTerm,
            targetLanguage: "ja", 
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      console.log("Data from backend:", data);
      //setTranslatedTerm(data.cooks);
      console.log("data from api: " + data)
      console.log("translated term: " + data.cooks);
      return data.results;
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
    //setSearchTerm("");
  };

  const renderBusinessCards = () => {
    if (fetchedData && Object.keys(fetchedData).length > 0) {
      const array = Object.values(fetchedData);
      return array.map((object) => (
        <div className="card">
          <Katsu className="katsu" />
          <div className="tired">
          <h4>{object.name}</h4>
          <p className="lvl2">{object.rating} stars ({object.user_ratings_total})</p>
          <p className="lvl3">{object.formatted_address}</p>
          </div>
        </div>
      ));
    } else {
      return (
        <>
          <div className="loading"></div> 
          <div className="loading"></div>
          <div className="loading"></div>
        </>
      );
    }
  };

  return (
    <div className="App">
        
        {
          !formSubmitted ? (
            <>
            <p className="rekki">Rekki</p>
              <div className="homePage">
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
                    </button>
                  </div>
                </form>
              </div>
              <>
                <Bear className="bear" />
              </>
            </>
          ) : (
            <div className="results">
              <p className="rekki">Rekki</p>
              {/* <p className="resultsFor">Results for</p>
              <div className="searchTerm">
                <p>
                {translatedTerm}({searchTerm})
                </p>
                </div> */}
              <div className="cards">
                {console.log(fetchedData)}
                {renderBusinessCards()}
              </div>
            </div>
          )
        }
    </div>
  );
}

export default App;

//hello
