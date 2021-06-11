'use strict';

const followHndler = require('../models/follow');

module.exports= async (req,res,next)=>{
  try {
    let result = await followHndler(req.body);
    res.status(201).json(result);    
  } catch (error) {
    next(error);
  }
};