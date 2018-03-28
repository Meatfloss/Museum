'use strict';

/**
 * Module dependencies
 */
var qijiaPolicy = require('../policies/qijia.server.policy'),
  qijia = require('../controllers/qijia.server.controller');

module.exports = function (app) {
  // Qijia collection routes
  app.route('/api/qijia').all(qijiaPolicy.isAllowed)
    .get(qijia.list)
    .post(qijia.create);

  // Single qijia routes
  app.route('/api/qijia/:qijiaId').all(qijiaPolicy.isAllowed)
    .get(qijia.read)
    .put(qijia.update)
    .delete(qijia.delete);

  // Finish by binding the qijia middleware
  app.param('qijiaId', qijia.qijiaByID);

  app.route('/api/qijiaItem/picture')
  .post(qijia.changePicture);
};
