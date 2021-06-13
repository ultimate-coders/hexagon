'use strict';

process.env.S3_BUCKET_NAME= 'asdsa';
process.env.GOOGLE_ID= 'sadas';

const server = require('../src/server');
const superTest = require ('supertest');
require('../src/error-handlers/404');
const serverRequest = superTest(server.app);

describe('error handlers', ()=> {

  it('404 on a bad route', async ()=> {
    let response = await serverRequest.get('/not-found-route');
    expect(response.status).toEqual(404);
  });
  
  it('404 on a bad method', async ()=> {
    let response = await serverRequest.get('/auth/signup');
    expect(response.status).toEqual(404);
  });

  it('500 if no name in the query string', async ()=> {
    let response = await serverRequest.get('/auth/google/failed');
    expect(response.status).toEqual(500);
  });
   
});