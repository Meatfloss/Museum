'use strict';

/**
 * Module dependencies
 */
var bronzesPolicy = require('../policies/bronzes.server.policy'),
  bronzes = require('../controllers/bronzes.server.controller');

module.exports = function (app) {
  // Bronzes collection routes
  app.route('/api/bronzes').all(bronzesPolicy.isAllowed)
    .get(bronzes.list)
    .post(bronzes.create);

  // Single bronze routes
  app.route('/api/bronzes/:bronzeId').all(bronzesPolicy.isAllowed)
    .get(bronzes.read)
    .put(bronzes.update)
    .delete(bronzes.delete);

  // Finish by binding the bronze middleware
  app.param('bronzeId', bronzes.bronzeByID);

  app.route('/api/bronze/picture')
  .post(bronzes.changePicture);
};
