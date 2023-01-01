import express from 'express';
import images from './api/images';

// Create the routes object
const routes = express.Router();

// Apply the route as middleware and setting the path
routes.use('/images', images);

export default routes;
