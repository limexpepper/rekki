const express = require('express');
const cors = require('cors'); 
const translateText = require('./src/google_translate.js');
const performTextSearch = require('./src/google_places.js');
// const { paginator } = require('@google-cloud/paginator');

const app = express(); 
const PORT = 3001;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.static('public'));

app.post('/translate-and-search', async (req, res) => {
  console.log("Inside server.js /translate-and-search");
  const { searchTerm } = req.body;
  console.log("Search Term:", searchTerm);
  
  try {
    const tTerm = await translateText(searchTerm, "ja");
    const sResults = await performTextSearch(tTerm);
    res.json({ searchResults: sResults, translatedTerm: tTerm }); 

  } catch (error) {
    console.error('Error performing translation and search:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});