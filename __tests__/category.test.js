require('dotenv').config();
process.env.TEST_MODE = true;
const  client  = require('../src/models/db');
(async ()=>{
  await client.connect();
})();

const {getCategories} = require('../src/models/category.js');



describe('category test', ()=>{
  afterAll(()=>{
    client.end();
  });
  it('should return all catagories', async ()=>{
    let results = await getCategories();
    let expected = [{'id': 1, 'name': 'artist'}, {'id': 2, 'name': 'engneer'}, {'id': 3, 'name': 'desighner'}];
    expect( results.rows).toEqual(expected);
  }); 
});
