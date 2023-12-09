const {Translate} = require('@google-cloud/translate').v2;
const path = require('path');
const dotenv = require('dotenv');
const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });
  
const CREDENTIALS = JSON.parse(process.env.REACT_APP_CREDENTIALS);

// Configuration for the client
const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

const translateText = async (text, targetLanguage) => {
    try {
        let [response] = await translate.translate(text, targetLanguage); // console.log("HERE --->" + response)
        return response;
    } catch (error) {
        console.log(`Error at translateText --> ${error}`);
        return 0;
    }
}; 
//translateText('how are you', 'ja'); //uncomment to test the function

module.exports = translateText;

// const detectLanguage = async (text) => {

//     try {
//         let response = await translate.detect(text);
//         console.log(response[0].language);
//         return response[0].language;
//     } catch (error) {
//         console.log(`Error at detectLanguage --> ${error}`);
//         return 0;
//     }
// }

// detectLanguage('Oggi è lunedì'); uncomment to test the function. should return "it" which stands for italian. 