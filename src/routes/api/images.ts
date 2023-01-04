import express from 'express';
import path from 'path';
import { promises as fsPromises } from 'fs';
import { isParamsExist, isValidDimension } from '../../utilities/validate';

// Create the route object for images endpoint
const images = express.Router();

images.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const myReqParams = req.query;
    // Request parameters
    const imgName = myReqParams['filename']
      ? (myReqParams['filename'] as string).trim()
      : (myReqParams['filename'] as string);
    const width = myReqParams['width'] as string;
    const height = myReqParams['height'] as string;
    // The image's path
    const imgPath = path.join(
      path.resolve('./'),
      `/assets/images/full/${imgName}.jpg`
    );

    // Check if all the parameters in the request exist
    if (!isParamsExist(imgName, width, height)) {
      res.status(400).send(
        `<strong>Missing parameters</strong><br> 
        Please write the filename of the image <br>
        and the dimensions (width and height).`
      );
      // Check if the parameters of the dimension valid(+ve number > 0)
    } else if (!isValidDimension(width, height)) {
      res
        .status(422)
        .send('Invalid Params. Dimension must be positive number.');
    } else {
      fsPromises
        .readFile(imgPath) // Check if the image exist
        .then(() => res.status(200).sendFile(imgPath))
        .catch(() => res.status(404).send('Sorry, Image not found.'));
    }
  }
);

export default images;
