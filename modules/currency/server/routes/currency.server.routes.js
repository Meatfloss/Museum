'use strict';

/**
 * Module dependencies
 */
var currencyPolicy = require('../policies/currency.server.policy'),
  currency = require('../controllers/currency.server.controller');

module.exports = function (app) {
  // Currency collection routes
  app.route('/api/currency').all(currencyPolicy.isAllowed)
    .get(currency.list)
    .post(currency.create);

  // Single currency routes
  app.route('/api/currency/:currencyId').all(currencyPolicy.isAllowed)
    .get(currency.read)
    .put(currency.update)
    .delete(currency.delete);

  // Finish by binding the currency middleware
  app.param('currencyId', currency.currencyByID);

  app.route('/api/currencyItem/picture')
  .post(currency.changePicture);
};
