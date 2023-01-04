import supertest from 'supertest';
import path from 'path';
import fs from 'fs';
import sizeOf from 'image-size';
import app from '../index';
import resizeImage from '../utilities/resizeImage';
import { ImgInfo } from '../utilities/validate';

const request = supertest(app);

// Tests for the API endpoints
describe('Test endpoint responses', (): void => {
  // Home end point
  it(`gets '/' the home endpoint`, async (): Promise<void> => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
  // Invalid endpoint
  it('gets invalid endpoint', async (): Promise<void> => {
    const response = await request.get('/path');
    expect(response.status).toBe(400);
  });

  // Tests for '/api/iamges' endpoint
  describe(`Get '/api/iamges' endpoint responses`, (): void => {
    // Missing parameter
    it('responds with 400 if there is missing parameters', async (): Promise<void> => {
      const response = await request.get('/api/images?filename=fjord');
      expect(response.status).toBe(400);
    });
    // Invalid parameter
    it('responds with 422 if there is invalid parameter', async (): Promise<void> => {
      const response = await request.get(
        '/api/images?filename=fjord&width=-50&height=100'
      );
      expect(response.status).toBe(422);
    });
    // Image not found
    it('responds with 404 if the image not found', async (): Promise<void> => {
      const response = await request.get(
        '/api/images?filename=fff&width=100&height=100'
      );
      expect(response.status).toBe(404);
    });
    // Image is found and all parameters valid
    it('responds with 200 if the image exist and all the parameters valid', async (): Promise<void> => {
      const response = await request.get(
        '/api/images?filename=fjord&width=100&height=100'
      );
      expect(response.status).toBe(200);
    });
  });
});

// Tests for resizing image process
describe('Test resize image process', (): void => {
  //Path of the test image to be resized
  const imgPath = path.join(
    path.resolve('./'),
    '/assets/images/full/fjord.jpg'
  );
  //Path of the resized test image
  const newImgPath = path.join(
    path.resolve('./'),
    '/assets/images/thumb/fjord_thumb_150x200.jpg'
  );
  // Resizing the image with no error
  it('resize image with no error', async (): Promise<void> => {
    const myTestImg: ImgInfo = {
      imgPath: imgPath,
      imgWidth: '150',
      imgHeight: '200',
      newImgPath: newImgPath
    };
    await resizeImage(myTestImg);
  });
  // Resized image exist
  it('resized image exists', (): void => {
    expect(fs.existsSync(newImgPath)).toBeTruthy();
  });
  // Resized image has correct dimensions
  it('resized image created with the correct dimension', (): void => {
    const dimensions = sizeOf(path.resolve(newImgPath));
    expect(dimensions.width).toEqual(150);
    expect(dimensions.height).toEqual(200);
  });
  // Dimensions out of range
  it('responds with 422 if the image could not processed (dimensions out of range)', async (): Promise<void> => {
    const response = await request.get(
      '/api/images?filename=fjord&width=100000&height=100'
    );
    expect(response.status).toBe(422);
  });
});
