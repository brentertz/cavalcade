'use strict';

var async = require('async');
var config = require('config');

var queue = require('./services/queue-service')(config);
var workers = require('./lib/workers');

var process = function() {
  var ctx = {};

  queue.receiveMessage(function(err, data) {
    if (data.Messages && data.Messages.length) {
      ctx.message = data.Messages[0];
      console.log('Processing message:', ctx.message);

      async.series([
        function(callback) {
          queue.deleteMessage(ctx.message, callback);
        },
        function(callback) {
          async.applyEachSeries(workers, ctx.message, callback);
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
