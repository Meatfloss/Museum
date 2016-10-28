'use strict';

/**
 * Module dependencies
 */
var famillesPolicy = require('../policies/familles.server.policy'),
  familles = require('../controllers/familles.server.controller');

module.exports = function (app) {
  // Familles collection routes
  app.route('/api/familles').all(famillesPolicy.isAllowed)
    .get(familles.list)
    .post(familles.create);

  // Single famille routes
  app.route('/api/familles/:familleId').all(famillesPolicy.isAllowed)
    .get(familles.read)
    .put(familles.update)
    .delete(familles.delete);

  // Finish by binding the famille middleware
  app.param('familleId', familles.familleByID);

  app.route('/api/famille/picture')
  .post(familles.changePicture);
};
