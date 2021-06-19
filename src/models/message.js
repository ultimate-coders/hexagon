const client = require('./db');

const { PAGE_SIZE } = require('../configurations');


let createMessage = async (message , senderId, receiverId)=>{
  let SQL = `INSERT INTO message (message,sender_id,receiver_id) VALUES ($1,$2,$3) RETURNING *;`;
  let safeValues = [message,senderId,receiverId];
  let result = await client.query(SQL, safeValues);
  return result;
};

let getMessage = async (senderId , receiverId, pageNumber = 1) =>{
  try {
    let startFrom = (pageNumber - 1) * PAGE_SIZE;
    let SQL = `SELECT DISTINCT * FROM message WHERE (sender_id=$1 AND receiver_id=$2) OR (sender_id=$2 AND receiver_id=$1) ORDER BY created_at DESC LIMIT $3 OFFSET $4;`;
    let safeValues = [ senderId,receiverId, PAGE_SIZE + 1, startFrom];
    let messagesData = await client.query(SQL, safeValues);
    let results = messagesData.rows;
    const hasNext = messagesData.rowCount > PAGE_SIZE;
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

let deleteMessage = async (id) =>{
  try {
    let SQL = `DELETE FROM message WHERE id=$1;`;
    let safeValue = [id];
    let result = await client.query(SQL, safeValue);
    return result;
  } catch (error) {
    throw new Error(error);

  }
};

let updateMessage =  async (id) =>{
  try {
    let SQL = `UPDATE message SET seen=true WHERE id=$1;`;
    let safeValues = [id];
    let result = await client.query(SQL, safeValues);
    return result;
  } catch (e) {
    throw new Error(e);
  }  
};

module.exports = {
  createMessage,
  getMessage,
  deleteMessage,
  updateMessage,
};



