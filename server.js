const express = require('express');
const cors = require('cors'); 
const translateText = require('./src/google_translate.js');
const performTextSearch = require('./src/google_places.js');

const app = express(); 
const PORT = 3001;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.static('public'));

app.post('https://main--bespoke-duckanoo-11bce7.netlify.app/translate-and-search', async (req, res) => {
    const { searchTerm, targetLanguage } = req.body;
    const modifiedSearchTerm = searchTerm + " in Tokyo";
    console.log("modifiedSearchTerm: " + modifiedSearchTerm);
    try {
      const translatedTerm = await translateText(modifiedSearchTerm, targetLanguage);
      const searchResults = await performTextSearch(translatedTerm);
      res.json({ results: searchResults, cooks: translatedTerm }); 

    } catch (error) {
      console.error('Error performing translation and search:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });