'use strict';

/**
 * Module dependencies
 */
var goldsilverPolicy = require('../policies/goldsilver.server.policy'),
  goldsilver = require('../controllers/goldsilver.server.controller');

module.exports = function (app) {
  // Goldsilver collection routes
  app.route('/api/goldsilver').all(goldsilverPolicy.isAllowed)
    .get(goldsilver.list)
    .post(goldsilver.create);

  // Single goldsilver routes
  app.route('/api/goldsilver/:goldsilverId').all(goldsilverPolicy.isAllowed)
    .get(goldsilver.read)
    .put(goldsilver.update)
    .delete(goldsilver.delete);

  // Finish by binding the goldsilver middleware
  app.param('goldsilverId', goldsilver.goldsilverByID);

  app.route('/api/goldsilverItem/picture')
  .post(goldsilver.changePicture);
};
