## Image Processing API

An API that can be used in two different ways. As a simple placeholder API:

*   It allows to place images on the frontend with the size set via URL parameters for rapid prototyping.
*   As a library to serve properly scaled versions of the images to the front end to reduce page load size. Rather than needing to resize and upload multiple copies of the same image to be used throughout the site.  
    The API will handle resizing and serving stored images.

## Getting Started

Download or Clone the repository to your computer.

### Prerequisites and Local Development

> You should already have node and npm installed.

### Dependencies

*   [Node.js](https://nodejs.org/)
*   [Express](https://expressjs.com/)
*   [Sharp](https://sharp.pixelplumbing.com/)

### Dev dependencies

*   [TypeScript](https://www.typescriptlang.org/)
*   [Prettier](https://prettier.io/)
*   [ESLint](https://eslint.org/)
*   [nodemon](https://nodemon.io/)
*   [Jasmine](https://jasmine.github.io/)
*   [SuperTest](https://www.npmjs.com/package/supertest)
*   [image-size](https://www.npmjs.com/package/image-size)

### Running the server

Navigate to the project root directory `/image-processng-api`, open your terminal and run:

```plaintext
npm install
```

This will install the dependencies required for the project.

To start the server run:

```plaintext
npm run start
```

## API Reference

### Getting Started

> Server running at URL: http://localhost:3000/

### Endpoints

#### GET `/api/aimages?filename<str:image_name>&width=<int:image_width>&height=<int:image_height>`

*   Request Arguments:
    *   `image_name`: (string) - The image's name will be resized.
    *   `image_width`: (integer) - Pixels wide of the resultant image should be > 0.
    *   `image_height`: (integer) - Pixels high of the resultant image should be > 0.
*   Returns: The resized image to the frontend

> **Note:**
> 
> Images are available in `assets/images/full`. You can add further images, but make sure that the image's type is jpg.
> 
> Resized images will be stored in the `assets/images/thumb` folder.
> 
> **Available images:**
> 
> encenadaport
> 
> fjord
> 
> icelandwaterfall
> 
> santamonica
> 
> palmtunnel

## Testing

To test the app run :

```plaintext
npm run test
```
> **Note:** Make sure that `fjord` image is exist in `assets/images/full` when running the test. 