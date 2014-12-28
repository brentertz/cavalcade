'use strict';

var Message = function(options) {
  options = options || {};

  this.type = options.type || 'generic';
  this.body = options.body || '';

  this.ingest = function(raw) {
    this.raw = raw;
    this.body = raw.Body;
    this.receiptHandle = raw.ReceiptHandle;
    this.sentTimestamp = raw.Attributes.SentTimestamp;
    this.type = raw.MessageAttributes.type.StringValue;

    return this;
  }.bind(this);
};

module.exports = Message;
