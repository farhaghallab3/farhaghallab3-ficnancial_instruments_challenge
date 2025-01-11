const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

export default async function handler(req, res) {
  const { REACT_APP_API_URL, SECRET_API_KEY } = process.env;

  if (!REACT_APP_API_URL || !SECRET_API_KEY) {
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  if (req.method === 'GET') {
    try {
      const response = await fetch(`${REACT_APP_API_URL}/data`, {
        headers: {
          Authorization: `Bearer ${SECRET_API_KEY}`,
        },
      });
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch data', details: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}




// Function to load JSON data dynamically with better error handling
const loadJSON = (fileName) => {
  try {
    const filePath = path.join(__dirname, 'data', fileName);
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

// Routes to serve JSON files
app.get('/api/exchange', (req, res) => {
  const data = loadJSON('exchange.json');
  if (!data) {
    return res.status(500).json({ message: 'Failed to load exchange data.' });
  }
  res.json(data);
});

app.post('/api/exchange', (req, res) => {
  const newData = req.body; // Get new data from the request body
  const filePath = path.join(__dirname, 'data', 'exchange.json');

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


// Export the app for testing purposes
module.exports = app;

// Start the server (only if not running in test environment)
if (require.main === module) {
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });

}
