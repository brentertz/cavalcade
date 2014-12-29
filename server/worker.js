'use strict';

var _ = require('lodash');
var async = require('async');
var config = require('config');

var queue = require('./services/queue-service')(config);
var workers = require('./lib/workers');
var Message = require('./lib/message');

var process = function() {
  queue.receiveMessage(function(err, data) {
    if (data.Messages && data.Messages.length) {
      var message = new Message().ingest(data.Messages[0]);
      console.log('Processing message:', message);

      async.series([
        function(callback) {
          async.applyEachSeries(_.pluck(workers, 'process'), message, callback);
        },
        function(callback) {
          queue.deleteMessage(message, callback);
        }
      ], function(err, data) {
        if (err) {
          console.log(err, err.stack);
        } else {
          console.log('Done');
        }
      });
    } else {
      console.log('No messages to process at this time');
    }
  });
};

console.log('Worker started');

(function poll() {
  process();
  setTimeout(poll, 30e3);
})();
