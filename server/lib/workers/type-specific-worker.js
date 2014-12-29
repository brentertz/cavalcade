'use strict';

var Worker = require('../worker');

var worker = new Worker({
  name: 'type-specific-worker',
  handledMessageTypes: ['type-specific']
});

worker.processMessage = function(message, callback) {
  console.log('%s processed message', worker.name);
  callback(null);
};

module.exports = worker;
