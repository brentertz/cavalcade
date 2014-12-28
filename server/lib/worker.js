'use strict';

var Worker = function(options) {
  options = options || {};

  if (!options.name) {
    throw new Error('Worker requires a name');
  }

  this.name = options.name;
  this.priority = typeof options.priority !== 'undefined' ? parseInt(options.priority, 10) : 0;

  this.process = function(message, callback) {
    console.log('Process method should be overridden by instance');
    callback(null);
  }
};

module.exports = Worker;
