import express from 'express';
import { promises as fsPromises } from 'fs';
import path from 'path';
import {
  isParamsExist,
  isValidDimension,
  ImgInfo
} from '../../utilities/validate';
import resizeImage from './../../utilities/resizeImage';

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
    // The thumb folder path were the resized image will be stored
    const thumbImgsDirPath = path.join(
      path.resolve('./'),
      `/assets/images/thumb`
    );
    // If the thumb folder not found then create it
    fsPromises
      .readdir(thumbImgsDirPath)
      .then()
      .catch((): Promise<void> => fsPromises.mkdir(thumbImgsDirPath));
    // The resized image path
    const newImgPath =
      thumbImgsDirPath + `/${imgName}_thumb_${width}x${height}.jpg`;

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
      /* 
      Check first if the request image with the same resized dimention exist in the thumb folder
      if it exists send it 
      if not then resize the requested image and save it in the thumb folder
      and send it to the user 
      */
      fsPromises
        .readFile(newImgPath) // Check firstt if the resised image in thumb folder
        .then((): void => res.status(200).sendFile(newImgPath))
        .catch((): void => {
          fsPromises
            .readFile(imgPath) // Check if the image exist
            .then((): void => {
              // The requested image information
              const myImg: ImgInfo = {
                imgPath: imgPath,
                imgWidth: width,
                imgHeight: height,
                newImgPath: newImgPath
              };
              // Resize the image and respond with the new resized image
              resizeImage(myImg)
                .then((): void => res.status(200).sendFile(newImgPath))
                .catch(
                  (): express.Response =>
                    // if dimentions requested very large (out of range)
                    res.status(422)
                      .send(`Sorry, the image couldn't be resized.<br>
                  coordinates out of range`)
                );
            })
            .catch(
              (): express.Response =>
                res.status(404).send('Sorry, Image not found.')
            );
        });
    }
  }
);

export default images;
