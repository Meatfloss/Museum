'use strict';

/**
 * Module dependencies
 */
var guibiPolicy = require('../policies/guibi.server.policy'),
  guibi = require('../controllers/guibi.server.controller');

module.exports = function (app) {
  // Guibi collection routes
  app.route('/api/guibi').all(guibiPolicy.isAllowed)
    .get(guibi.list)
    .post(guibi.create);

  // Single guibi routes
  app.route('/api/guibi/:guibiId').all(guibiPolicy.isAllowed)
    .get(guibi.read)
    .put(guibi.update)
    .delete(guibi.delete);

  // Finish by binding the guibi middleware
  app.param('guibiId', guibi.guibiByID);

  app.route('/api/guibiItem/picture')
  .post(guibi.changePicture);
};
