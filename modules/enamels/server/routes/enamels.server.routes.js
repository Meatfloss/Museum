'use strict';

/**
 * Module dependencies
 */
var enamelsPolicy = require('../policies/enamels.server.policy'),
  enamels = require('../controllers/enamels.server.controller');

module.exports = function (app) {
  // Enamels collection routes
  app.route('/api/enamels').all(enamelsPolicy.isAllowed)
    .get(enamels.list)
    .post(enamels.create);

  // Single enamel routes
  app.route('/api/enamels/:enamelId').all(enamelsPolicy.isAllowed)
    .get(enamels.read)
    .put(enamels.update)
    .delete(enamels.delete);

  // Finish by binding the enamel middleware
  app.param('enamelId', enamels.enamelByID);

  app.route('/api/enamel/picture')
  .post(enamels.changePicture);
};
