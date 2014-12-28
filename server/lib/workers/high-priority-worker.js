'use strict';

var Worker = require('../worker');

var worker = new Worker({
  name: 'high-priority-worker',
  priority: 100
});

worker.process = function(message, callback) {
  console.log('%s processed message', worker.name);
  callback(null);
};

module.exports = worker;
