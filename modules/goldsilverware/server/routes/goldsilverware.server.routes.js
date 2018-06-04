'use strict';

/**
 * Module dependencies
 */
var goldsilverwarePolicy = require('../policies/goldsilverware.server.policy'),
  goldsilverware = require('../controllers/goldsilverware.server.controller');

module.exports = function (app) {
  // Goldsilverware collection routes
  app.route('/api/goldsilverware').all(goldsilverwarePolicy.isAllowed)
    .get(goldsilverware.list)
    .post(goldsilverware.create);

  // Single goldsilverware routes
  app.route('/api/goldsilverware/:goldsilverwareId').all(goldsilverwarePolicy.isAllowed)
    .get(goldsilverware.read)
    .put(goldsilverware.update)
    .delete(goldsilverware.delete);

  // Finish by binding the goldsilverware middleware
  app.param('goldsilverwareId', goldsilverware.goldsilverwareByID);

  app.route('/api/goldsilverwareItem/picture')
  .post(goldsilverware.changePicture);
};
