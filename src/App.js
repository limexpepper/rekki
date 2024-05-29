import React, { useState } from "react";
import "./App.css";
import { ReactComponent as SearchIcon } from "./search.svg";
import { ReactComponent as Bear } from "./bear.svg";
import { ReactComponent as Katsu } from "./katsu.svg";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false); 
  const [translatedTerm, setTranslatedTerm] = useState("");
  const [imageURL, setImageURL] = useState("");



  const fetchData = async (searchTerm) => {
    console.log("Fetching data");
    try {
      const response = await fetch(
        "https://rekki.onrender.com/translate-and-search",//"http://localhost:3001/translate-and-search",//"https://main--bespoke-duckanoo-11bce7.netlify.app/translate-and-search",
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
      setTranslatedTerm(data.cooks); //console.log("translated term: " + translatedTerm);
      setImageURL(data.results.imageURL)
      return data.results.deets;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const data = await fetchData(searchTerm);
    setFetchedData(data);
    //console.log("data from api: " + data)
  };

  const renderBusinessCards = () => {
    if (fetchedData && Object.keys(fetchedData).length > 0) {
      const array = Object.values(fetchedData);
      return array.map((object) => {
        console.log(object);
        return (
          <div className="card" key={object.place_id}>
            <img src='imageURL' className="smallImage"/>    {/*<img src={object.photos[0].photo_reference}/>*/}
            <div className="tired">
              <h4>{object.name}</h4>
              <p className="lvl2">{object.rating} stars ({object.user_ratings_total})</p>
              <p className="lvl3">{object.formatted_address}</p>
            </div>
          </div>
        );
      });
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
        <div className="rekki">Rekki</div>
        {
          !formSubmitted ? (
            <>
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
                <div className="resultsFor">Results for {translatedTerm} ({searchTerm})</div>
              <div className="cards">
                {renderBusinessCards()}               {/* {console.log(fetchedData)} */}
              </div>
            </div>
          )
        }
    </div>
  );
}

export default App;
