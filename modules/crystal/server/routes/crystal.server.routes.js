'use strict';

/**
 * Module dependencies
 */
var crystalPolicy = require('../policies/crystal.server.policy'),
  crystal = require('../controllers/crystal.server.controller');

module.exports = function (app) {
  // Crystal collection routes
  app.route('/api/crystal').all(crystalPolicy.isAllowed)
    .get(crystal.list)
    .post(crystal.create);

  // Single crystal routes
  app.route('/api/crystal/:crystalId').all(crystalPolicy.isAllowed)
    .get(crystal.read)
    .put(crystal.update)
    .delete(crystal.delete);

  // Finish by binding the crystal middleware
  app.param('crystalId', crystal.crystalByID);

  app.route('/api/crystalItem/picture')
  .post(crystal.changePicture);
};
