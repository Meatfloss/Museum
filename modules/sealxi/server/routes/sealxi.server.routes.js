'use strict';

/**
 * Module dependencies
 */
var sealxiPolicy = require('../policies/sealxi.server.policy'),
  sealxi = require('../controllers/sealxi.server.controller');

module.exports = function (app) {
  // Sealxi collection routes
  app.route('/api/sealxi').all(sealxiPolicy.isAllowed)
    .get(sealxi.list)
    .post(sealxi.create);

  // Single sealxi routes
  app.route('/api/sealxi/:sealxiId').all(sealxiPolicy.isAllowed)
    .get(sealxi.read)
    .put(sealxi.update)
    .delete(sealxi.delete);

  // Finish by binding the sealxi middleware
  app.param('sealxiId', sealxi.sealxiByID);

  app.route('/api/sealxiItem/picture')
  .post(sealxi.changePicture);
};
