require('dotenv').config();
process.env.TEST_MODE = true;
process.env.DATABASE_URL_TEST = process.env.DATABASE_URL_TEST2;
const  client  = require('../../src/models/db');
(async ()=>{
  await client.connect();
})();

const { app } = require('../../src/server');
const superTest = require('supertest');
const request = superTest(app);

const {getCategories} = require('../../src/models/category.js');
let users = {
  first: { user_name: 'admin', email: 'admin@yahoo.com',  password: 'Password1@' },
  second: { user_name: 'writer', email: 'writer@yahoo.com',  password: 'Password1@' },
};


describe('category test', ()=>{
  let accessToken;
  beforeAll(async()=>{
    await request.post('/auth/signup').send(users.first);
    let result2 = await request.post('/auth/signin').set('Authorization', `Basic YWRtaW5AeWFob28uY29tOlBhc3N3b3JkMUA=`);
    accessToken = result2.body.access_token;
  });
  afterAll(()=>{
    client.end();
  });
  it('should return all catagories', async ()=>{
    let results = await getCategories();
    let expected = [{'id': 1, 'name': 'artist'}, {'id': 2, 'name': 'engneer'}, {'id': 3, 'name': 'desighner'}];
    expect( results).toEqual(expected);
  }); 
  it('should use the category controller', async () => {
    let res = await request.get('/api/v1/category').set('Authorization', `Bearer ${accessToken}`);
    console.log("🚀 ~ file: category.test.js ~ line 34 ~ it ~ res", res.body)

    expect(res.status).toEqual(200);
  });
});
