'use strict';

/**
 * Module dependencies
 */
var fourtreasurePolicy = require('../policies/fourtreasure.server.policy'),
  fourtreasure = require('../controllers/fourtreasure.server.controller');

module.exports = function (app) {
  // Fourtreasure collection routes
  app.route('/api/fourtreasure').all(fourtreasurePolicy.isAllowed)
    .get(fourtreasure.list)
    .post(fourtreasure.create);

  // Single fourtreasure routes
  app.route('/api/fourtreasure/:fourtreasureId').all(fourtreasurePolicy.isAllowed)
    .get(fourtreasure.read)
    .put(fourtreasure.update)
    .delete(fourtreasure.delete);

  // Finish by binding the fourtreasure middleware
  app.param('fourtreasureId', fourtreasure.fourtreasureByID);

  app.route('/api/fourtreasureItem/picture')
  .post(fourtreasure.changePicture);
};
