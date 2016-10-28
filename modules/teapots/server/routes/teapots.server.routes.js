'use strict';

/**
 * Module dependencies
 */
var teapotsPolicy = require('../policies/teapots.server.policy'),
  teapots = require('../controllers/teapots.server.controller');

module.exports = function (app) {
  // Teapots collection routes
  app.route('/api/teapots').all(teapotsPolicy.isAllowed)
    .get(teapots.list)
    .post(teapots.create);

  // Single teapot routes
  app.route('/api/teapots/:teapotId').all(teapotsPolicy.isAllowed)
    .get(teapots.read)
    .put(teapots.update)
    .delete(teapots.delete);

  // Finish by binding the teapot middleware
  app.param('teapotId', teapots.teapotByID);

  app.route('/api/teapot/picture')
  .post(teapots.changePicture);
};
