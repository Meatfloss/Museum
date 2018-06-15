'use strict';

/**
 * Module dependencies
 */
var treasuresPolicy = require('../policies/treasures.server.policy'),
  treasures = require('../controllers/treasures.server.controller');

module.exports = function (app) {
  // Treasures collection routes
  app.route('/api/treasures').all(treasuresPolicy.isAllowed)
    .get(treasures.list)
    .post(treasures.create);

  // Single treasures routes
  app.route('/api/treasures/:treasuresId').all(treasuresPolicy.isAllowed)
    .get(treasures.read)
    .put(treasures.update)
    .delete(treasures.delete);

  // Finish by binding the treasures middleware
  app.param('treasuresId', treasures.treasuresByID);

  app.route('/api/treasuresItem/picture')
  .post(treasures.changePicture);
};
