'use strict';

/**
 * Module dependencies
 */
var sculpturePolicy = require('../policies/sculpture.server.policy'),
  sculpture = require('../controllers/sculpture.server.controller');

module.exports = function (app) {
  // Sculpture collection routes
  app.route('/api/sculpture').all(sculpturePolicy.isAllowed)
    .get(sculpture.list)
    .post(sculpture.create);

  // Sculpture collection routes
  app.route('/api/sculpture/:dynasty/:category').all(sculpturePolicy.isAllowed)
    .get(sculpture.filteredList);

  // Single sculpture routes
  app.route('/api/sculpture/:sculptureId').all(sculpturePolicy.isAllowed)
    .get(sculpture.read)
    .put(sculpture.update)
    .delete(sculpture.delete);

  // Finish by binding the sculpture middleware
  app.param('sculptureId', sculpture.sculptureByID);

  app.route('/api/sculptureItem/picture')
    .post(sculpture.changePicture);
};
