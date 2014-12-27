'use strict';


module.exports = function(app, config) {
  var queueService = require('./queue-service');

  app.services = {
    queue: queueService(config)
  };
};

