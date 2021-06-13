require('dotenv').config();
process.env.TEST_MODE = true;
const  client  = require('../src/models/db');
(async ()=>{
  await client.connect();
})();
const { app } = require('../src/server');
const superTest = require('supertest');
const request = superTest(app);
const fs = require('fs');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
describe('messages tests', ()=>{
  afterAll(()=>{
    client.end();
  });

  it('should upload an image', async()=>{
    let res = await chai.request(app).post('/api/v1/file-upload')
      .set('content-type', 'multipart/form-data')
      .attach('file', fs.readFileSync(`img/female.jpg`));
    console.log(res)
      
    expect(res.status).toEqual(201);
  });
});