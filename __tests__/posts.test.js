'use strict';

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
// const uploadS3 = require('../src/middleware/uploader')
const FormData = require('form-data');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);



describe('post tests', ()=>{
  afterAll(()=>{
    client.end();
  }); 
  it('should return all posts', async ()=>{
    
    let res = await request.get('/api/v1/posts');

    let expected =  {'category': {'id': 3, 'name': 'desighner'}, 'id': 5, 'images': [{'id': 5, 'link': '../img/female.jpg'}], 'profile': {'caption': null, 'first_name': 'anwar', 'id': 5, 'last_name': 'isleet', 'profile_picture': {'id': 1, 'link': '../img/female.jpg'}, 'user': {'email': 'anwar@yahoo.com', 'id': 5, 'username': 'anwar'}}, 'text': 'rrrrr'};
            
    expect(res.status).toEqual(200);
    // expect(res.body.results[0]).toEqual(expected);
  });
  it('should return all posts for specific category', async ()=>{
    
    let res = await request.get('/api/v1/posts?category=engneer');

    let expected =   {
      id: 3,
      text: 'rrrrr',
      category: { id: 2, name: 'engneer' },
      profile: {
        id: 3,
        first_name: 'amjad',
        last_name: 'mesmar',
        caption: 'desighner',
        profile_picture: { id: 2, link: '../img/male.jpg' },
        user: { id: 3, username: 'amjad', email: 'amjad@yahoo.com' },
      },
      images: [ { id: 3, link: '../img/male.jpg' } ],
    };
            
    expect(res.status).toEqual(200);
    // expect(res.body.results[0]).toEqual(expected);
  });
  it('should get a single post', async ()=>{
    
    let res = await request.get('/api/v1/posts/1');

    let expected =   {
      'id': 1,
      'text': 'rrrrr',
      'category': {
        'id': 1,
        'name': 'artist',
      },
      'profile': {
        'id': 1,
        'first_name': 'tamara',
        'last_name': 'al-rashed',
        'caption': 'artist',
        'profile_picture': {
          'id': 1,
          'link': '../img/female.jpg',
        },
        'user': {
          'id': 1,
          'username': 'tamara',
          'email': 'tamara@yahoo.com',
        },
      },
      'images': [
        {
          'id': 1,
          'link': '../img/female.jpg',
        },
      ],
    };
            
    expect(res.status).toEqual(200);
    // expect(res.body).toEqual(expected);
  });

  it('should create a post', async ()=>{
  
    let res = await chai.request(app).post('/api/v1/posts')
      .set('content-type', 'multipart/form-data')
      .field('category_id', 1)
      .field('text', 'ok')
      .field('profile_id', 1)
      .attach('image', fs.readFileSync(`img/female.jpg`));
      console.log('res.files', res.files)
    expect(res.status).toEqual(201);
  });
  it('should update a post', async ()=>{
  
    // let res = await chai.request(app).put('/api/v1/posts/2')
    //   .set('content-type', 'multipart/form-data')
    //   .field('category_id', 1)
    //   .field('text', 'ok');
    let obj= {
      category_id: 2,
      text: 'okk',
    };
    let res = await request.put('/api/v1/posts/2').send(obj);
    expect(res.status).toEqual(200);
  });



}); 