'use strict';

/**
 * Module dependencies
 */
var glasswarePolicy = require('../policies/glassware.server.policy'),
  glassware = require('../controllers/glassware.server.controller');

module.exports = function (app) {
  // Glassware collection routes
  app.route('/api/glassware').all(glasswarePolicy.isAllowed)
    .get(glassware.list)
    .post(glassware.create);

  // Single glassware routes
  app.route('/api/glassware/:glasswareId').all(glasswarePolicy.isAllowed)
    .get(glassware.read)
    .put(glassware.update)
    .delete(glassware.delete);

  // Finish by binding the glassware middleware
  app.param('glasswareId', glassware.glasswareByID);

  app.route('/api/glasswareItem/picture')
  .post(glassware.changePicture);
};
