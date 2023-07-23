const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
  const { url } = req.query;

  if (!url || !Array.isArray(url)) {
    return res.status(400).json({ error: 'Invalid URL parameter. Please provide one or more valid URLs.' });
  }

  try {
    const promises = url.map((singleUrl) => axios.get(singleUrl));
    const responses = await Promise.all(promises);

    const combinedData = responses.map((response) => response.data);

    res.json({ data: combinedData });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(port, () => {
  console.log(`Number Management Service is running on http://localhost:${port}`);
});
