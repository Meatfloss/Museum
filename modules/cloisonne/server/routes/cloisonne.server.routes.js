'use strict';

/**
 * Module dependencies
 */
var cloisonnePolicy = require('../policies/cloisonne.server.policy'),
  cloisonne = require('../controllers/cloisonne.server.controller');

module.exports = function (app) {
  // Cloisonne collection routes
  app.route('/api/cloisonne').all(cloisonnePolicy.isAllowed)
    .get(cloisonne.list)
    .post(cloisonne.create);

  // Single cloisonne routes
  app.route('/api/cloisonne/:cloisonneId').all(cloisonnePolicy.isAllowed)
    .get(cloisonne.read)
    .put(cloisonne.update)
    .delete(cloisonne.delete);

  // Finish by binding the cloisonne middleware
  app.param('cloisonneId', cloisonne.cloisonneByID);

  app.route('/api/cloisonneItem/picture')
  .post(cloisonne.changePicture);
};
