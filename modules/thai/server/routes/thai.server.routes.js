'use strict';

/**
 * Module dependencies
 */
var thaiPolicy = require('../policies/thai.server.policy'),
  thai = require('../controllers/thai.server.controller');

module.exports = function (app) {
  // Thai collection routes
  app.route('/api/thai').all(thaiPolicy.isAllowed)
    .get(thai.list)
    .post(thai.create);

  // Single thai routes
  app.route('/api/thai/:thaiId').all(thaiPolicy.isAllowed)
    .get(thai.read)
    .put(thai.update)
    .delete(thai.delete);

  // Finish by binding the thai middleware
  app.param('thaiId', thai.thaiByID);

  app.route('/api/thaiItem/picture')
  .post(thai.changePicture);
};
