'use strict';

/**
 * Module dependencies
 */
var ceramicsPolicy = require('../policies/ceramics.server.policy'),
  ceramics = require('../controllers/ceramics.server.controller');

module.exports = function (app) {
  // Ceramics collection routes
  app.route('/api/ceramics').all(ceramicsPolicy.isAllowed)
    .get(ceramics.list)
    .post(ceramics.create);

  // Single ceramic routes
  app.route('/api/ceramics/:ceramicId').all(ceramicsPolicy.isAllowed)
    .get(ceramics.read)
    .put(ceramics.update)
    .delete(ceramics.delete);

  // Finish by binding the ceramic middleware
  app.param('ceramicId', ceramics.ceramicByID);

  app.route('/api/ceramic/picture')
  .post(ceramics.changePicture);
};
