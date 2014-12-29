'use strict';

var _ = require('lodash');
var Message = require('./message');

var Worker = function(options) {
  options = options || {};

  if (!options.name) {
    throw new Error('Worker requires a name');
  }

  this.name = options.name;
  this.priority = typeof options.priority !== 'undefined' ? parseInt(options.priority, 10) : 0;
  this.handledMessageTypes = options.handledMessageTypes || [Message.DEFAULT_TYPE];

  this.process = function(message, callback) {
    var shouldProcess = !!(_.intersection(this.handledMessageTypes, [Message.DEFAULT_TYPE, message.type]).length);
    if (shouldProcess) {
      this.processMessage.apply(this, arguments);
    } else {
      console.log('%s skipped message', this.name);
      callback(null);
    }
  }.bind(this);

  this.processMessage = function(message, callback) {
    console.log('Worker processMessage method should be overridden by instance');
    callback(null);
  }
};

module.exports = Worker;
