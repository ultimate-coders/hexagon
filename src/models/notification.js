const client = require('./db');
const PAGE_SIZE = 10;

let createNotification = async (message, senderId, receiverId, postId )=>{
  try {
    let SQL = `INSERT INTO notification message=$1, sender_id=$2, receiver_id=$3, post_id=$4;`;
    let safeValues = [message, senderId, receiverId, postId];
    let result = await client.query(SQL, safeValues);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
 
let getNotification = async (receiverId, pageNumber = 1)=>{
  try {
    let SQL = `SELECT * FROM notification WHERE receiver_id=$1 ORDER BY id DESC LIMIT=$2 OFFSET=$3 ;`;
    let safeValues = [receiverId, PAGE_SIZE, pageNumber*PAGE_SIZE];
    let result = await client.query(SQL, safeValues);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

let updateNotification =  async (id)=>{
  try {
    let SQL = `UPDATE notification SET seen=$1 WHERE id=$2;`;
    let safeValues = [true ,id];
    let result = await client.query(SQL, safeValues);
    return result; 
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createNotification,
  getNotification,
  updateNotification,
};