'use strict';

var moment = require('moment');
var uuid = require('node-uuid');
var AWS = require('aws-sdk');

module.exports = function(config) {
  var sqs = new AWS.SQS({
    accessKeyId: config.get('aws.accessKeyId'),
    secretAccessKey: config.get('aws.secretAccessKey'),
    region: config.get('aws.region')
  });

  var preProcess = function(message) {
    message.published = message.published || moment.utc().format();
    message.id = message.id || uuid();
    return JSON.stringify(message);
  };

  return {
    sendMessage: function(message, callback) {
      var params = {
        MessageBody: preProcess(message),
        QueueUrl: config.get('aws.sqs.queueUrl')
      };

      sqs.sendMessage(params, function(err, data) {
        if (err) {
          console.log(err, err.stack);
          callback && callback(err);
        } else {
          callback && callback(null, data);
        }
      })
    }
  }
};
