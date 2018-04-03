'use strict';

/**
 * Module dependencies
 */
var jadePolicy = require('../policies/jade.server.policy'),
  jade = require('../controllers/jade.server.controller');

module.exports = function (app) {
  // Jade collection routes
  app.route('/api/jade').all(jadePolicy.isAllowed)
    .get(jade.list)
    .post(jade.create);

  // Jade collection routes
  app.route('/api/jade/:dynasty/:category').all(jadePolicy.isAllowed)
    .get(jade.filteredList);

  // Single jade routes
  app.route('/api/jade/:jadeId').all(jadePolicy.isAllowed)
    .get(jade.read)
    .put(jade.update)
    .delete(jade.delete);

  // Finish by binding the jade middleware
  app.param('jadeId', jade.jadeByID);

  app.route('/api/jadeItem/picture')
    .post(jade.changePicture);
};
