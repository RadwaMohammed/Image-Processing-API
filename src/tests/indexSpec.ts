import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

// Tests for the API endpoints
describe('Test endpoint responses', (): void => {

  it(`gets '/' the home endpoint`, async (): Promise<void> => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
  
  it('gets invalid endpoint', async (): Promise<void> => {
    const response = await request.get('/path');
    expect(response.status).toBe(400);
  });
});

