'use strict';

require('dotenv').config();
process.env.TEST_MODE = true;
process.env.DATABASE_URL_TEST='postgresql://emranaloul:12345@localhost:5432/test2';
const  client  = require('../../src/models/db');

const { app } = require('../../src/server');
const superTest = require('supertest');
const request = superTest(app);

let users = {
  first: { user_name: 'admin', email: 'admin@yahoo.com',  password: 'Password1@' },
  second: { user_name: 'writer', email: 'writer@yahoo.com',  password: 'Password1@' },
};

describe('notifications test', ()=>{
  let id1;
  let id2;
  let id3;
  let accessToken;
  beforeAll( async () => {

    await client.connect();
    await request.post('/auth/signup').send(users.first);
    let result2 = await request.post('/auth/signin').set('Authorization', `Basic YWRtaW5AeWFob28uY29tOlBhc3N3b3JkMUA=`);
    accessToken = result2.body.access_token;
    let re = await request.get('/api/v1/me-profile').set('Authorization', `Bearer ${accessToken}`);
    let SQL = `INSERT INTO post(profile_id,category_id,text) VALUES ($1,1,'rrrrr') RETURNING *;`;  
    let safeValue = [re.body.id];
    let result = await client.query(SQL, safeValue);
    id1 = result.rows[0].id;
    id2 = result.rows[0].profile_id;
  });
  
  
  afterAll(()=>{
    client.end();
  });
  it('should create a notification', async ()=>{
    
    let obj = {
      
      message: 'he liked your post',
      receiver_id: id2,
      post_Id: id1,
      
    };
    let res = await request.post('/api/v1/notifications').set('Authorization', `Bearer ${accessToken}`).send(obj);
    // console.log('🚀 ~ file: notifications.test.js ~ line 52 ~ it ~ res', res.body);
    id3 = res.body.id;
    expect(res.status).toEqual(201);
    expect(res.body.message).toEqual(obj.message);
  });
  
  it('should get all notifications', async ()=>{
    
    let obj = {
      receiver_id: id2,
    };
    let res = await request.get('/api/v1/notifications').set('Authorization', `Bearer ${accessToken}`).send(obj);
    
    expect(res.status).toEqual(200);
    expect(res.body.results[0].message).toEqual('he liked your post');
  });
  it('should update notification', async ()=>{
    console.log('🚀 ~ file: notifications.test.js ~ line 217 ~ it ~ id3', id3);
    
    let res = await request.put(`/api/v1/notifications/${id3}`).set('Authorization', `Bearer ${accessToken}`);
      
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual('Successfully updated');
  });

});
