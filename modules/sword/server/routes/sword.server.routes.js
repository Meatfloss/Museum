'use strict';

/**
 * Module dependencies
 */
var swordPolicy = require('../policies/sword.server.policy'),
  sword = require('../controllers/sword.server.controller');

module.exports = function (app) {
  // Sword collection routes
  app.route('/api/sword').all(swordPolicy.isAllowed)
    .get(sword.list)
    .post(sword.create);

  // Single sword routes
  app.route('/api/sword/:swordId').all(swordPolicy.isAllowed)
    .get(sword.read)
    .put(sword.update)
    .delete(sword.delete);

  // Finish by binding the sword middleware
  app.param('swordId', sword.swordByID);

  app.route('/api/swordItem/picture')
  .post(sword.changePicture);
};
