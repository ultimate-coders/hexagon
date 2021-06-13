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
  });

});