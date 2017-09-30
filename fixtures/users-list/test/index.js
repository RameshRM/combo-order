'use strict';

var assert = require('assert');

var usersHandler = require('../').handler;
usersHandler.call(this, undefined, undefined, function (err, result){
  assert.ok(!err);
  assert.ok(result);
});
