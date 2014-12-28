'use strict';

var Worker = require('../worker');

var worker = new Worker({
  name: 'regular-priority-worker'
});

worker.process = function(message, callback) {
  console.log('%s processed message', worker.name);
  callback(null);
};

module.exports = worker;
