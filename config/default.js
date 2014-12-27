'use strict';

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  aws: {
    accessKeyId: 'DO NOT COMMIT SENSITIVE INFO',
    secretAccessKey: 'DO NOT COMMIT SENSITIVE INFO',
    region: 'us-west-2',
    sqs: {
      queueUrl: 'https://sqs.us-west-2.amazonaws.com/281389346308/cavalcade-' + (process.env.NODE_ENV || 'development')
    }
  }
};
