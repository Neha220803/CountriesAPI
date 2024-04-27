const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/country_api", { useNewUrlParser: true, useUnifiedTopology: true });

const countrySchema = new mongoose.Schema({
    name: String,
    capital: String,
    currency: String,
    nativeName: String,
    timeZone: String,
    languages: [String],
    latitude: Number,
    longitude: Number,
    population: Number,
    flag: String,
    populationCategory: { type: String, enum: ['high', 'medium', 'low'] }
});

const Country = mongoose.model('Country', countrySchema);

function categorizePopulation(population) {
    if (population > 100000000) {
        return 'high'; //high if greater than 100M
    } else if (population > 10000000) {
        return 'medium'; //medium if greater than 10M
    } else {
        return 'low';
    }
}

app.get('/fetchAndSaveCountryInfo', async (req, res) => {
    const countryName = req.query.countryName; // Get country name from query parameter
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        const countryData = response.data[0];
        const newCountry = new Country({
            name: countryData.name.common,
            capital: countryData.capital[0] || 'not available',
            currency: countryData.currencies ? countryData.currencies[Object.keys(countryData.currencies)[0]].name : 'not available',
            nativeName: countryData.name.nativeName ? countryData.name.nativeName.common : 'none',
            timeZone: countryData.timezones ? countryData.timezones[0] : 'none',
            flag: countryData.flags.png,
            languages: countryData.languages ? Object.values(countryData.languages) : [],
            latitude: countryData.latlng ? countryData.latlng[0] : 0,
            longitude: countryData.latlng ? countryData.latlng[1] : 0,
            population: countryData.population || 0,
            populationCategory: categorizePopulation(countryData.population)
        });

        await newCountry.save();

        res.status(201).json({ message: 'Country information saved successfully' });
    } catch (error) {
        console.error('Error fetching and saving country information:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/getLastSavedCountryInfo', async (req, res) => {
    try {
        const lastSavedCountry = await Country.findOne().sort({ _id: -1 }).limit(1);
        if (lastSavedCountry) {
            res.status(200).json(lastSavedCountry); // Send the last saved country information as a response
        } else {
            res.status(404).json({ message: 'No country information found' }); // If no country information is found
        }
    }
    catch (error) {
        console.error('Error retrieving last saved country information:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(30001, () => {
    console.log("Server is running on port 30001");
});