'use strict';

/**
 * Module dependencies
 */
var longshanPolicy = require('../policies/longshan.server.policy'),
  longshan = require('../controllers/longshan.server.controller');

module.exports = function (app) {
  // Longshan collection routes
  app.route('/api/longshan').all(longshanPolicy.isAllowed)
    .get(longshan.list)
    .post(longshan.create);

  // Single longshan routes
  app.route('/api/longshan/:longshanId').all(longshanPolicy.isAllowed)
    .get(longshan.read)
    .put(longshan.update)
    .delete(longshan.delete);

  // Finish by binding the longshan middleware
  app.param('longshanId', longshan.longshanByID);

  app.route('/api/longshanItem/picture')
  .post(longshan.changePicture);
};
