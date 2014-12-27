'use strict';

module.exports = function(app) {
  var SiteController = require('../controllers/site-controller')();

  app.get('/', SiteController.index);
};
