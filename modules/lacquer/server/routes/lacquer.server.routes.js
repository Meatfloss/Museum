'use strict';

/**
 * Module dependencies
 */
var lacquerPolicy = require('../policies/lacquer.server.policy'),
  lacquer = require('../controllers/lacquer.server.controller');

module.exports = function (app) {
  // Lacquer collection routes
  app.route('/api/lacquer').all(lacquerPolicy.isAllowed)
    .get(lacquer.list)
    .post(lacquer.create);

  // Single lacquer routes
  app.route('/api/lacquer/:lacquerId').all(lacquerPolicy.isAllowed)
    .get(lacquer.read)
    .put(lacquer.update)
    .delete(lacquer.delete);

  // Finish by binding the lacquer middleware
  app.param('lacquerId', lacquer.lacquerByID);

  app.route('/api/lacquerItem/picture')
  .post(lacquer.changePicture);
};
