'use strict';

/**
 * Module dependencies
 */
var amberPolicy = require('../policies/amber.server.policy'),
  amber = require('../controllers/amber.server.controller');

module.exports = function (app) {
  // Amber collection routes
  app.route('/api/amber').all(amberPolicy.isAllowed)
    .get(amber.list)
    .post(amber.create);

  // Single amber routes
  app.route('/api/amber/:amberId').all(amberPolicy.isAllowed)
    .get(amber.read)
    .put(amber.update)
    .delete(amber.delete);

  // Finish by binding the amber middleware
  app.param('amberId', amber.amberByID);

  app.route('/api/amberItem/picture')
  .post(amber.changePicture);
};
