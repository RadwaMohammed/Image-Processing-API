import express from 'express';

// Create the global application object
const app = express();
const port = 3000;

// Define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('server working!!');
});

// Start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
