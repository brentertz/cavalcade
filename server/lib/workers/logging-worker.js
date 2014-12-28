'use strict';

var process = function(message, callback) {
  console.log('logging-worker processed message');
  callback(null);
};

module.exports = function(message, callback) {
  process(message, callback);
};
