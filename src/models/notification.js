const client = require('./db');
const { PAGE_SIZE } = require('../configurations');

let createNotification = async (message, receiverId, postId )=>{
  try {
    let SQL = `INSERT INTO notification (message, receiver_id, post_id) VALUES ($1,$2,$3) RETURNING *;`;
    let safeValues = [message, receiverId, postId];
    let result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};
 
let getNotification = async (receiverId, pageNumber = 1)=>{
  try {
    let startFrom = (pageNumber - 1) * PAGE_SIZE;
    let SQL = `SELECT * FROM notification WHERE receiver_id=$1 ORDER BY created_at DESC LIMIT $2 OFFSET $3 ;`;
    let safeValues = [receiverId, PAGE_SIZE + 1, startFrom];
    let notificationsData = await client.query(SQL, safeValues);
    let results = notificationsData.rows;
    const hasNext = notificationsData.rowCount > PAGE_SIZE;
    if(hasNext)  results = results.slice(0, -1);
    const response = {
      page: pageNumber,
      hasNext: hasNext,
      results: results,
    };
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

let updateNotification =  async (id)=>{
  try {
    let SQL = `UPDATE notification SET seen=$1 WHERE id=$2 RETURNING *;`;
    let safeValues = [true ,id];
    let result = await client.query(SQL, safeValues);
    return result.rows[0]; 
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createNotification,
  getNotification,
  updateNotification,
};