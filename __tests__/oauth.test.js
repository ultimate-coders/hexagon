require('dotenv').config();
process.env.TEST_MODE = true;
const  client  = require('../src/models/db');
(async ()=>{
  await client.connect();
})();

const { app } = require('../src/server');
const superTest = require('supertest');
const request = superTest(app);


describe('notifications test', ()=>{
  afterAll(()=>{
    client.end();
  });

  it('should sign in using oauth', async ()=>{
    let res = await request.get('/auth/google');
    
    expect(res.status).toEqual(302);
      
  });

  it('should not sign using oauth', async ()=>{

    let res = await request.get('/auth/failed');
    expect(res.status).toEqual(403);
    
  });

  it('should sign using oauth', async ()=>{
    let res = await request.get('/auth/google/callback');   
    expect(res.status).toEqual(302);
    
  });
});