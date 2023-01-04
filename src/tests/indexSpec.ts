import supertest from 'supertest';
import app from '../index';

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
