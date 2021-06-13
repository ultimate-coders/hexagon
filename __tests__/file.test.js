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
describe('messages tests', ()=>{
  afterAll(()=>{
    client.end();
  });

  it('should upload an image', async()=>{
    let res =  await request.post('/file-upload').attach('image', fs.readFileSync(`img/female.jpg`))

        
    console.log(res);
  });
});