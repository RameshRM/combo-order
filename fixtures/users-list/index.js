'use strict';

var optimusDbCtx = require('optimus-db').db;
var userEntity = optimusDbCtx.UserEntity;

module.exports.handler = handler;

function handler(event, context, callback) {

  var usersListFn = userEntity.list(optimusDbCtx.getPool());
  return usersListFn({}, function(err, result) {
    if (err) {
      context && context.fail();
    }
    context && context.succeed(result);
    callback(err, result);
  });
}
