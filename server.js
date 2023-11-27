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
      res.json({ results: searchResults }); //res.redirect(`/search-results?results=${encodeURIComponent(JSON.stringify(searchResults))}`);

    } catch (error) {
      console.error('Error performing translation and search:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

/*
app.get('/google-places', async (req, res) => {
    const query = req.query.query;
    
    try {
      // Call the performTextSearch function passing the query
      const places = await performTextSearch(query);
  
      // Send back the places retrieved from performTextSearch
      res.json({ results: places });
    } catch (error) {
      console.error('Error performing text search:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/google-translate', async (req, res) => {
    const text = req.query.text;
    const targetLanguage = req.query.targetLanguage;
  
    try {
      // Call the translateText function passing the text and target language
      const translatedText = await translateText(text, targetLanguage);
  
      // Send back the translated text
      res.json({ translatedText });
    } catch (error) {
      console.error('Error translating text:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
*/

// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
// import express from 'express';

// const app = express(); 
// app.listen(3001, () => console.log('listening at 3001')); // recall, we want to create a web server so that we can use it to listen to requests
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use(express.static(join(__dirname, 'public')));


