'use strict';

module.exports = function(app) {
  var MessagesController = require('../../controllers/api/messages-controller')(app);

  app.post('/api/messages', MessagesController.create);
};
