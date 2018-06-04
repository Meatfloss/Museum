'use strict';

/**
 * Module dependencies
 */
var snuffPolicy = require('../policies/snuff.server.policy'),
  snuff = require('../controllers/snuff.server.controller');

module.exports = function (app) {
  // Snuff collection routes
  app.route('/api/snuff').all(snuffPolicy.isAllowed)
    .get(snuff.list)
    .post(snuff.create);

  // Single snuff routes
  app.route('/api/snuff/:snuffId').all(snuffPolicy.isAllowed)
    .get(snuff.read)
    .put(snuff.update)
    .delete(snuff.delete);

  // Finish by binding the snuff middleware
  app.param('snuffId', snuff.snuffByID);

  app.route('/api/snuffItem/picture')
  .post(snuff.changePicture);
};
