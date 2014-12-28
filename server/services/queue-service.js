'use strict';

var AWS = require('aws-sdk');

module.exports = function(config) {
  var sqs = new AWS.SQS({
    accessKeyId: config.get('aws.accessKeyId'),
    secretAccessKey: config.get('aws.secretAccessKey'),
    region: config.get('aws.region')
  });

  var queueUrl = config.get('aws.sqs.queueUrl');

  return {
    sendMessage: function(message, callback) {
      var params = {
        QueueUrl: queueUrl,
        MessageBody: message.body,
        MessageAttributes: {
          type: {
            DataType: 'String',
            StringValue: message.type
          }
        }
      };

      sqs.sendMessage(params, function(err, data) {
        if (err) {
          console.log(err, err.stack);
          callback && callback(err);
        } else {
          console.log('Message sent to queue', data);
          callback && callback(null, data);
        }
      })
    },

    receiveMessage: function(callback) {
      var params = {
        QueueUrl: queueUrl,
        AttributeNames: ['All'],
        MessageAttributeNames: ['All']
      };

      sqs.receiveMessage(params, function(err, data) {
        if (err) {
          console.log(err, err.stack);
          callback && callback(err);
        } else {
          console.log('Checking for queued messages');
          callback && callback(null, data);
        }
      })
    },

    deleteMessage: function(message, callback) {
      var params = {
        QueueUrl: queueUrl,
        ReceiptHandle: message.receiptHandle
      };

      sqs.deleteMessage(params, function(err, data) {
        if (err) {
          console.log(err, err.stack);
          callback && callback(err);
        } else {
          console.log('Message deleted from queue', data);
          callback && callback(null, data);
        }
      });
    }
  }
};
