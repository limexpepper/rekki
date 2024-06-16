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

  const mockData = {
    cooks: "mock-translated-term",
    results: {
      imageURL: "https://example.com/mock-image.jpg",
      deets: {
        "1": {
          place_id: "1",
          name: "Mock Place 1",
          rating: 1,
          user_ratings_total: 150,
          formatted_address: "123 Mock St"
        },
        "2": {
          place_id: "2",
          name: "Mock Place 2",
          rating: 2,
          user_ratings_total: 150,
          formatted_address: "123 Mock St"
        },
        "3": {
          place_id: "3",
          name: "Mock Place 3",
          rating: 3,
          user_ratings_total: 150,
          formatted_address: "123 Mock St"
        },
        "4": {
          place_id: "4",
          name: "Mock Place 4",
          rating: 4,
          user_ratings_total: 150,
          formatted_address: "123 Mock St"
        }
      }
    }

  }

  // !***Uncomment this block of code to unable API call to the backend***!
  // const fetchData = async (searchTerm) => {
  //   console.log("Fetching data");
  //   try {
  //     const response = await fetch(
  //       "https://rekki.onrender.com/translate-and-search",//"http://localhost:3001/translate-and-search",//"https://main--bespoke-duckanoo-11bce7.netlify.app/translate-and-search",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           searchTerm: searchTerm,
  //           targetLanguage: "ja",
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok.");
  //     }
  //     const data = await response.json();
  //     setTranslatedTerm(data.cooks); //console.log("translated term: " + translatedTerm);
  //     setImageURL(data.results.imageURL);
  //     return data.results.deets;
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };


  const fetchData = async (searchTerm) => { // Simulate an API call with mock data
    console.log("Fetching data");
    return new Promise((resolve) => {
      setTimeout(() => {
        setTranslatedTerm(mockData.cooks);
        setImageURL(mockData.results.imageURL);
        resolve(mockData.results.deets);
      }, 100); // Simulate a delay of 500ms
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const data = await fetchData(searchTerm);
    setFetchedData(data);
  };

  const renderBusinessCards = () => {
    if (fetchedData && Object.keys(fetchedData).length > 0) {
      const array = Object.values(fetchedData);
      return array.map((object) => {
        console.log(object);
        return (
          <div className="card" key={object.place_id}>
            <img src="imageURL" className="smallImage" />{" "}
            {/*<img src={object.photos[0].photo_reference}/>*/}
            <div className="tired">
              <h4>{object.name}</h4>
              <p className="lvl2">
                {object.rating} stars ({object.user_ratings_total})
              </p>
              <p className="lvl3">{object.formatted_address}</p>
            </div>
          </div>
        );
      });
    } else {
      return (
        <p> No results found</p>
      );
    }
  };

  return (
    <div className={`App ${formSubmitted ? "form-submitted" : ""}`}>
      <div className="rekki">Rekki</div>
      <div className={`homePage ${formSubmitted ? "moveUp" : ""}`}>
        <p className="intro-text">Google like a Japanese, without using Japanese</p>
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
      {!formSubmitted ? (<Bear className="bear" />) : (
        <div className="results">
          <div className="resultsFor">
            Results for {translatedTerm} ({searchTerm})
          </div>
          <div className="cards">
            {renderBusinessCards()} {/* {console.log(fetchedData)} */}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
