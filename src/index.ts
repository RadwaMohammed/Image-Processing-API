import express from 'express';
import routes from './routes/index';

// Create the global application object
const app = express();
const port = 3000;
// Instructions of using the API
const instruction = ` The route is http://localhost:${port}/api/images?filename=imageName&width=imgWidth&height=imgHeight 
<br><br> width and height should be positive numbers 
<br>The available images<br>
<li>encenadaport</li>
<li>fjord</li>
<li>icelandwaterfall</li>
<li>santamonica</li>
<li>palmtunnel</li>`;

// Define a route handler for the default home page
app.get('/', (req: express.Request, res: express.Response): void => {
  res.send(
    `<strong>Welcome to the Image Processing API</strong><br><br>${instruction}`
  );
});

//using the routes module as middleware
// Using api as main path to all of api routes
app.use('/api', routes);

// Define a root hndler for any wrong path
app.get('*', (req: express.Request, res: express.Response): void => {
  res
    .status(400)
    .send(`<strong>Wrong API route</strong><br><br>${instruction}`);
});

// Start th Express server
app.listen(port, (): void => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
