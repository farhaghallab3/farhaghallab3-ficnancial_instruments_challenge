const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(
  cors({
    origin: "https://frontend-fnwjkjwk9-farhaghallab3s-projects.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

// Function to load JSON data dynamically
const loadJSON = (fileName) => {
  try {
    const filePath = path.join(__dirname, '..', 'data', fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error(`File ${fileName} not found.`);
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error loading JSON file: ${fileName}`, error.message);
    return null;
  }
};

// Routes
app.get('/api/exchange', (req, res) => {
  const data = loadJSON('exchange.json');
  if (!data) {
    return res.status(500).json({ message: 'Failed to load exchange data.' });
  }
  res.json(data);
});

app.post('/api/exchange', (req, res) => {
  const newData = req.body;
  const filePath = path.join(__dirname, '..', 'data', 'exchange.json');

  try {
    const existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    if (!existingData.hits || !existingData.hits.hits) {
      existingData.hits = { hits: [] };
    }
    existingData.hits.hits.push({ _id: newData.id, _source: newData });

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf-8');

    res.status(201).json({ message: 'Data added successfully.' });
  } catch (error) {
    console.error('Error writing to JSON file:', error.message);
    res.status(500).json({ message: 'Failed to add data.' });
  }
});

app.get('/api/metadata', (req, res) => {
  const data = loadJSON('metadata.json');
  if (!data) {
    return res.status(500).json({ message: 'Failed to load metadata.' });
  }
  res.json(data);
});

app.get('/api/candle', (req, res) => {
  console.log('Fetching candlestick data...');
  const data = loadJSON('candle.json');
  if (!data) {
    console.error('Failed to load candle data.');
    return res.status(500).json({ message: 'Failed to load candle data.' });
  }
  console.log('Candle data loaded:', data);
  res.json(data);
});

module.exports = app;
