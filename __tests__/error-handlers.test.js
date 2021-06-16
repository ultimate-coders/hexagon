'use strict';

process.env.S3_BUCKET_NAME= 'asdsa';
process.env.GOOGLE_ID= 'sadas';

const server = require('../src/server');
const superTest = require ('supertest');
const serverRequest = superTest(server.app);

describe('error handlers', ()=> {

  it('404 on a bad route', async ()=> {

    let response = await serverRequest.get('/not-found-route');
    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual('Sorry, we could not find what you were looking for');
    
  });
  
  it('404 on a bad method', async ()=> {

    let response = await serverRequest.get('/auth/signup');
    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual('Sorry, we could not find what you were looking for');

  });

  it('500 if no name in the query string', async ()=> {
  
    let response = await serverRequest.get('/api/v1/me-profile/');
    expect(response.status).toEqual(500);
    expect(response.body.message).toEqual('Invalid Login');

  });
   
});