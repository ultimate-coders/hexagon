'use strict';
const {addORdeleteInteraction} = require('../models/interaction');

async function interactionHndler(req, res, next) {
  try {
    let result = await addORdeleteInteraction(req);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}




module.exports = {interactionHndler};