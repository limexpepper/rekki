const express = require('express');
const cors = require('cors'); 
const translateText = require('./backend/google_translate.js');
const performTextSearch = require('./backend/google_places.js');

const app = express(); 
const PORT = 3001;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.static('public'));

app.post('/translate-and-search', async (req, res) => {
    const { searchTerm, targetLanguage } = req.body;
    const modifiedSearchTerm = searchTerm + " in Japan";
    console.log("modifiedSearchTerm: " + modifiedSearchTerm);
    try {
      const translatedTerm = await translateText(modifiedSearchTerm, targetLanguage);
      const searchResults = await performTextSearch(translatedTerm);
      res.json({ results: searchResults }); 

    } catch (error) {
      console.error('Error performing translation and search:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });