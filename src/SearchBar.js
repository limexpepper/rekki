import "./SearchBar.css";
import { useState } from "react";
import { ReactComponent as SearchIcon } from "./search.svg";
import { useNavigate } from "react-router-dom";
import useFetchData from "./utilities/useFetchData";// Import the useFetchData custom hook

// const mockData = {
//   cooks: "mock-translated-term",
//   results: {
//     imageURL: "https://example.com/mock-image.jpg",
//     deets: {
//       1: {
//         place_id: "1",
//         name: "Mock Place 1",
//         rating: 1,
//         user_ratings_total: 150,
//         formatted_address: "123 Mock St",
//       },
//       2: {
//         place_id: "2",
//         name: "Mock Place 2",
//         rating: 2,
//         user_ratings_total: 150,
//         formatted_address: "123 Mock St",
//       },
//       3: {
//         place_id: "3",
//         name: "Mock Place 3",
//         rating: 3,
//         user_ratings_total: 150,
//         formatted_address: "123 Mock St",
//       },
//       4: {
//         place_id: "4",
//         name: "Mock Place 4",
//         rating: 4,
//         user_ratings_total: 150,
//         formatted_address: "123 Mock St",
//       },
//       5: {
//         place_id: "5",
//         name: "Mock Place 5",
//         rating: 4,
//         user_ratings_total: 150,
//         formatted_address: "123 Mock St",
//       },
//     },
//   },
// };

const SearchBar = () => {
  const { fetchData } = useFetchData(); // Destructure fetchData from the custom hook
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    console.log("Inside handleSearch");
    e.preventDefault();
    const data = await fetchData(searchTerm);
    navigate("/results", {
      state: {
        searchTerm: searchTerm,
        translatedTerm: data.translatedTerm,
        imageURL: data.imageURL,
        fetchedData: data.fetchedData,
      },
    });
  };

  // const handleSearch = async (e) => { // Test function to get mock data
  //     e.preventDefault();
  //     const translatedTerm = mockData.cooks;
  //     const imageURL = mockData.results.imageURL;
  //     const fetchedData = mockData.results.deets;
  //     navigate("/results", { state: { searchTerm: searchTerm, translatedTerm: translatedTerm, imageURL: imageURL, fetchedData: fetchedData } });
  //   };


  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        placeholder="Give Rekki an English search term to Google in Japanese e.g. 'Pancakes'"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="submit-btn">
        <SearchIcon className="searchIcon" />
      </button>
    </form>
  );
};

export default SearchBar;
