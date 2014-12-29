'use strict';

var DEFAULT_MESSAGE_TYPE = '*';

var Message = function(options) {
  options = options || {};

  this.type = options.type || DEFAULT_MESSAGE_TYPE;
  this.body = options.body || '';
};

Message.prototype.ingest = function(raw) {
  this.raw = raw;
  this.body = raw.Body;
  this.receiptHandle = raw.ReceiptHandle;
  this.sentTimestamp = raw.Attributes.SentTimestamp;
  this.type = raw.MessageAttributes.type.StringValue;

  return this;
}.bind(this);

Message.DEFAULT_TYPE = DEFAULT_MESSAGE_TYPE;

module.exports = Message;
