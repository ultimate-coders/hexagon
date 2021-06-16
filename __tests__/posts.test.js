'use strict';

require('dotenv').config();
process.env.TEST_MODE = true;
process.env.DATABASE_URL_TEST = process.env.DATABASE_URL_TEST2;
const  client  = require('../src/models/db');
(async ()=>{
  await client.connect();
})();
const { app } = require('../src/server');
const superTest = require('supertest');
const request = superTest(app);
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

let users = {
  first: { user_name: 'admin', email: 'admin@yahoo.com',  password: 'Password1@' },
  second: { user_name: 'writer', email: 'writer@yahoo.com',  password: 'Password1@' },
};

describe('post tests', ()=>{
  let id1;
  let id2;
  let accessToken;
  beforeAll(async()=>{
    await request.post('/auth/signup').send(users.first);
    let result2 = await request.post('/auth/signin').set('Authorization', `Basic YWRtaW5AeWFob28uY29tOlBhc3N3b3JkMUA=`);
    accessToken = result2.body.access_token;
    let re = await request.get('/api/v1/me-profile').set('Authorization', `Bearer ${accessToken}`);
    id1=re.body.id;
    console.log('🚀 ~ file: posts.test.js ~ line 36 ~ beforeAll ~ id1', id1);
  });
  afterAll(()=>{
    client.end();
  });
  it('should return all posts', async ()=>{
    
    let res = await request.get('/api/v1/posts').set('Authorization', `Bearer ${accessToken}`);
            
    expect(res.status).toEqual(200);
  });
  it('should return all posts for specific category', async ()=>{
    
    let res = await request.get('/api/v1/posts?category=engneer').set('Authorization', `Bearer ${accessToken}`);

  
            
    expect(res.status).toEqual(200);
  });
  it('should create a post', async ()=>{
  
    let res = await chai.request(app).post('/api/v1/posts').set('Authorization', `Bearer ${accessToken}`)
      .set('content-type', 'multipart/form-data')
      .field('category_id', 1)
      .field('text', 'ok')
      .field('profile_id', id1);
    id2 = res.body.id;
    expect(res.status).toEqual(201);
  });

  it('should get a single post', async ()=>{
    
    let res = await request.get(`/api/v1/posts/${id2}`).set('Authorization', `Bearer ${accessToken}`);
            
    expect(res.status).toEqual(200);
  });

  it('should update a post', async ()=>{
  
    let obj= {
      category_id: 2,
      text: 'okk',
    };
    let res = await request.put(`/api/v1/posts/${id2}`).set('Authorization', `Bearer ${accessToken}`).send(obj);
    expect(res.status).toEqual(201);
  });

  it('should delete a post', async ()=>{
    let res = await request.delete(`/api/v1/posts/${id2}`).set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toEqual(200);
  });

  it('should npt get a single post', async ()=>{
    
    let res = await request.get(`/api/v1/posts/id2`).set('Authorization', `Bearer ${accessToken}`);
            
    expect(res.status).toEqual(500);
  });

  it('should not create a post', async ()=>{
  
    let res = await chai.request(app).post('/api/v1/posts').set('Authorization', `Bearer ${accessToken}`)
      .set('content-type', 'multipart/form-data')
      .field('text', 'ok');
    // id2 = res.body.id;
    expect(res.status).toEqual(500);
  });


}); 