'use strict';

var fs = require('fs');
var path = require('path');

var files = fs.readdirSync(__dirname);
var current = path.basename(module.filename);
var workers = files.reduce(function(memo, file) {
  if (file !== current) {
    memo.push(require('./' + file));
  }
  return memo;
}, []);

workers.sort(function(a, b) {
  return b.priority - a.priority;
});

module.exports = workers;
