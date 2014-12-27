'use strict';

var Boom = require('boom');

module.exports = function() {
  return function(err, req, res, next) {
    if (!err instanceof Error) { return next(); }

    switch (err.name) {
    case 'ValidationError':
      err = Boom.wrap(err, 422, err.message || 'Validation failed');
      if (err.errors) {
        err.output.payload.errors = err.errors;
      }
      break;
    case 'MongoError':
      if (err.code === 11000 || err.code === 11001) { // Duplicate key errors
        err = Boom.wrap(err, 422, err.message);
      }
      break;
    }

    if (!err.isBoom) {
      err = Boom.wrap(err);
    }

    if (err.output.statusCode >= 500) {
      console.error(err.stack);
    }

    res.json(err.output.statusCode, err.output.payload);
  };
};

