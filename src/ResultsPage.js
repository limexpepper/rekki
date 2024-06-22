import "./ResultsPage.css";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
import useFetchData from "./utilities/useFetchData"; // Import the useFetchData custom hook

function ResultsPage() {
  const location = useLocation();
  const { searchTerm, translatedTerm, imageURL, fetchedData } = location.state;
  const [businesses, setBusinesses] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const { fetchData } = useFetchData(); // Destructure fetchData from the custom hook

  useEffect(() => {
    if (fetchedData && fetchedData.length > 0) {
      setBusinesses(fetchedData);
    }
  }, [fetchedData]);

  const loadMoreResults = async () => {
    const data = await fetchData(searchTerm, nextPageToken);
    setBusinesses([...businesses, ...data.deets]); // Append new results to existing businesses
    setNextPageToken(data.nextPageToken); // Update nextPageToken for further pagination
  };

  const renderBusinessCards = () => {
    if (fetchedData && Object.keys(fetchedData).length > 0) {
      const array = Object.values(fetchedData);
      return array.map((object) => {
        console.log(object);
        return (
          <div className="card" key={object.place_id}>
            <img src={imageURL} className="smallImage" />
            <div className="tired">
              <p>{object.name}</p>
              <p className="lvl2">
                {object.rating} stars ({object.user_ratings_total})
              </p>
              <p className="lvl3">{object.formatted_address}</p>
            </div>
          </div>
        );
      });
    } else {
      return <p>No results found</p>;
    }
  };

  return (
    <div className="resultsPage-main">
      <Logo />
      <SearchBar />
      <div className="resultsFor">
        Results for {translatedTerm} ({searchTerm})
      </div>
      <div className="cards">{renderBusinessCards()}</div>
      {nextPageToken && (
        <button className="load-more-btn" onClick={loadMoreResults}>
          Load More Results
        </button>
      )}
    </div>
  );
}

export default ResultsPage;
