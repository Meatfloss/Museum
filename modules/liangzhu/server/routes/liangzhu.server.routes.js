'use strict';

/**
 * Module dependencies
 */
var liangzhuPolicy = require('../policies/liangzhu.server.policy'),
  liangzhu = require('../controllers/liangzhu.server.controller');

module.exports = function (app) {
  // Liangzhu collection routes
  app.route('/api/liangzhu').all(liangzhuPolicy.isAllowed)
    .get(liangzhu.list)
    .post(liangzhu.create);

  // Single liangzhu routes
  app.route('/api/liangzhu/:liangzhuId').all(liangzhuPolicy.isAllowed)
    .get(liangzhu.read)
    .put(liangzhu.update)
    .delete(liangzhu.delete);

  // Finish by binding the liangzhu middleware
  app.param('liangzhuId', liangzhu.liangzhuByID);

  app.route('/api/liangzhuItem/picture')
  .post(liangzhu.changePicture);
};
