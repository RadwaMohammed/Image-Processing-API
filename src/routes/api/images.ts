import express from 'express';

// Create the route object for images endpoint
const images = express.Router();

images.get('/', (req, res) => {
  res.send('images route');
});

export default images;
