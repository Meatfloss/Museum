'use strict';

/**
 * Module dependencies
 */
var bronzepaintedPolicy = require('../policies/bronzepainted.server.policy'),
  bronzepainted = require('../controllers/bronzepainted.server.controller');

module.exports = function (app) {
  // Bronzepainted collection routes
  app.route('/api/bronzepainted').all(bronzepaintedPolicy.isAllowed)
    .get(bronzepainted.list)
    .post(bronzepainted.create);

  // Single bronzepainted routes
  app.route('/api/bronzepainted/:bronzepaintedId').all(bronzepaintedPolicy.isAllowed)
    .get(bronzepainted.read)
    .put(bronzepainted.update)
    .delete(bronzepainted.delete);

  // Finish by binding the bronzepainted middleware
  app.param('bronzepaintedId', bronzepainted.bronzepaintedByID);

  app.route('/api/bronzepaintedItem/picture')
  .post(bronzepainted.changePicture);
};
