const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Function to load JSON data dynamically with better error handling
const loadJSON = (fileName) => {
  try {
    const filePath = path.join(__dirname, '../data', fileName); // Adjust path
    if (!fs.existsSync(filePath)) {
      throw new Error(`File ${fileName} not found.`);
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error loading JSON file: ${fileName}`, error.message);
    return null; // Return null if there's an error
  }
};

app.get('/exchange', (req, res) => {
  const data = loadJSON('exchange.json');
  if (!data) {
    return res.status(500).json({ message: 'Failed to load exchange data.' });
  }
  res.json(data);
});

app.post('/exchange', (req, res) => {
  const newData = req.body; // Get new data from the request body
  const filePath = path.join(__dirname, '../data', 'exchange.json'); // Adjust path

  try {
    const existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Add new data to the hits array
    if (!existingData.hits || !existingData.hits.hits) {
      existingData.hits = { hits: [] };
    }
    existingData.hits.hits.push({ _id: newData.id, _source: newData });

    // Write updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf-8');

    res.status(201).json({ message: 'Data added successfully.' });
  } catch (error) {
    console.error('Error writing to JSON file:', error.message);
    res.status(500).json({ message: 'Failed to add data.' });
  }
});

app.get('/metadata', (req, res) => {
  const data = loadJSON('metadata.json');
  if (!data) {
    return res.status(500).json({ message: 'Failed to load metadata.' });
  }
  res.json(data);
});

app.get('/candle', (req, res) => {
  const data = loadJSON('candle.json');
  if (!data) {
    return res.status(500).json({ message: 'Failed to load candle data.' });
  }
  res.json(data);
});

module.exports = app;
