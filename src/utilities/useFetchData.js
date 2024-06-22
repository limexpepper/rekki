import { useState } from "react";

  const useFetchData = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [translatedTerm, setTranslatedTerm] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [fetchedData, setFetchedData] = useState([]);
  
    //// Uncomment this block of code to enable API call to the backend
    const fetchData = async (searchTerm, nextPageToken = null) => {
      console.log("Inside fetchData");
      try {
        const response = await fetch(
          "https://rekki.onrender.com/translate-and-search",
          // "http://localhost:3001/translate-and-search",
          //"https://main--bespoke-duckanoo-11bce7.netlify.app/translate-and-search",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              searchTerm: searchTerm,
              targetLanguage: "ja",
              nextPageToken: nextPageToken,
            }),
          }
        );
  
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setTranslatedTerm(data.cooks); //console.log("translated term: " + translatedTerm);
        setImageURL(data.results.imageURL);
        return data.results.deets;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
  
    return { translatedTerm, imageURL, fetchedData, fetchData };
};

export default useFetchData;