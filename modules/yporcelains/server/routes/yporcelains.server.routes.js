'use strict';

/**
 * Module dependencies
 */
var yporcelainsPolicy = require('../policies/yporcelains.server.policy'),
  yporcelains = require('../controllers/yporcelains.server.controller');

module.exports = function (app) {
  // Yporcelains collection routes
  app.route('/api/yporcelains').all(yporcelainsPolicy.isAllowed)
    .get(yporcelains.list)
    .post(yporcelains.create);

  // Single yporcelains routes
  app.route('/api/yporcelains/:yporcelainsId').all(yporcelainsPolicy.isAllowed)
    .get(yporcelains.read)
    .put(yporcelains.update)
    .delete(yporcelains.delete);

  // Finish by binding the yporcelains middleware
  app.param('yporcelainsId', yporcelains.yporcelainsByID);

  app.route('/api/yporcelainsItem/picture')
  .post(yporcelains.changePicture);
};
