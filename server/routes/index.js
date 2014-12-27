'use strict';

module.exports = function(app) {
  require('./site')(app);
  require('./api')(app);
};
