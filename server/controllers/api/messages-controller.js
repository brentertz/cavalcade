'use strict';

var Message = require('../../lib/message');

module.exports = function(app) {
  var MessagesController = {
    create: function(req, res, next) {
      var message = new Message({
        type: req.body.type,
        body: req.body.body
      });

      app.services.queue.sendMessage(message, function(err, data) {
        if (err) {
          return next(err);
        } else {
          res.status(201).json(data);
        }
      });
    }
  };

  return MessagesController;
};
