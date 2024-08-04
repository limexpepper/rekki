  const useFetchData = () => {  
    const fetchData = async (searchTerm) => {
      console.log("Inside fetchData");
      try {
        const response = await fetch(
          //"https://rekki.onrender.com/translate-and-search",
          "http://localhost:3001/translate-and-search",
          //"https://main--bespoke-duckanoo-11bce7.netlify.app/translate-and-search",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              searchTerm: searchTerm,
            }),
          }
        );
  
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return await response.json();

      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };
  
    return { fetchData }; // Note the curly braces
};

export default useFetchData;