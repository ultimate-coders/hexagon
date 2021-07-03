'use strict';

module.exports = function (err, req, res, next) {
  // Sometimes, errors come in as an object, others as a string
  console.log('Error :', err);
  const error = err.message ? err.message : err;
  const status = err.statusCode || 500;
  const errorObject = {
    status,
    message: error,
  };
  res.status(status).json(errorObject);
};
