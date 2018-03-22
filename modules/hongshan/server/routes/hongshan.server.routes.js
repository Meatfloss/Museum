'use strict';

/**
 * Module dependencies
 */
var hongshanPolicy = require('../policies/hongshan.server.policy'),
  hongshan = require('../controllers/hongshan.server.controller');

module.exports = function (app) {
  // Hongshan collection routes
  app.route('/api/hongshan').all(hongshanPolicy.isAllowed)
    .get(hongshan.list)
    .post(hongshan.create);

  // Single hongshan routes
  app.route('/api/hongshan/:hongshanId').all(hongshanPolicy.isAllowed)
    .get(hongshan.read)
    .put(hongshan.update)
    .delete(hongshan.delete);

  // Finish by binding the hongshan middleware
  app.param('hongshanId', hongshan.hongshanByID);

  app.route('/api/hongshanItem/picture')
  .post(hongshan.changePicture);
};
