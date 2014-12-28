'use strict';

var process = function(message, callback) {
  console.log('sample-worker processed message');
  callback(null);
};

module.exports = function(message, callback) {
  process(message, callback);
};
