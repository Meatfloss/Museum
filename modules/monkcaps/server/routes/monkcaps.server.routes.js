'use strict';

/**
 * Module dependencies
 */
var monkcapsPolicy = require('../policies/monkcaps.server.policy'),
  monkcaps = require('../controllers/monkcaps.server.controller');

module.exports = function (app) {
  // Monkcaps collection routes
  app.route('/api/monkcaps').all(monkcapsPolicy.isAllowed)
    .get(monkcaps.list)
    .post(monkcaps.create);

  // Monkcaps collection routes
  app.route('/api/monkcaps/:dynasty/:category').all(monkcapsPolicy.isAllowed)
    .get(monkcaps.filteredList);

  // Single monkcap routes
  app.route('/api/monkcaps/:monkcapId').all(monkcapsPolicy.isAllowed)
    .get(monkcaps.read)
    .put(monkcaps.update)
    .delete(monkcaps.delete);

  // Finish by binding the monkcap middleware
  app.param('monkcapId', monkcaps.monkcapByID);

  app.route('/api/monkcap/picture')
    .post(monkcaps.changePicture);
};
