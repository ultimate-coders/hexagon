const client = require('./db');
const PAGE_SIZE = 10;

let createNotification = async (message, senderId, receiverId, postId )=>{
  try {
    let SQL = `INSERT INTO notification (message, reciver_id, post_id) VALUES ($1,$2,$3) RETURNING *;`;
    let safeValues = [message, receiverId, postId];
    let result = await client.query(SQL, safeValues);
    return result.rows;
  } catch (error) {
    throw new Error(error);
  }
};
 
let getNotification = async (receiverId, pageNumber = 1)=>{
  try {
    let startFrom = (pageNumber - 1) * PAGE_SIZE;
    let SQL = `SELECT * FROM notification WHERE reciver_id=$1 ORDER BY id DESC LIMIT $2 OFFSET $3 ;`;
    let safeValues = [receiverId, PAGE_SIZE, startFrom];
    let result = await client.query(SQL, safeValues);
    return result.rows;
  } catch (error) {
    throw new Error(error);
  }
};

let updateNotification =  async (id)=>{
  try {
    let SQL = `UPDATE notification SET seen=$1 WHERE id=$2;`;
    let safeValues = [true ,id];
    let result = await client.query(SQL, safeValues);
    return result; 
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createNotification,
  getNotification,
  updateNotification,
};