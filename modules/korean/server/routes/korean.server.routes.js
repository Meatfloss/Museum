'use strict';

/**
 * Module dependencies
 */
var koreanPolicy = require('../policies/korean.server.policy'),
  korean = require('../controllers/korean.server.controller');

module.exports = function (app) {
  // Korean collection routes
  app.route('/api/korean').all(koreanPolicy.isAllowed)
    .get(korean.list)
    .post(korean.create);

  // Korean collection routes
  app.route('/api/korean/:dynasty/:category').all(koreanPolicy.isAllowed)
    .get(korean.filteredList);

  // Single korean routes
  app.route('/api/korean/:koreanId').all(koreanPolicy.isAllowed)
    .get(korean.read)
    .put(korean.update)
    .delete(korean.delete);

  // Finish by binding the korean middleware
  app.param('koreanId', korean.koreanByID);

  app.route('/api/koreanItem/picture')
    .post(korean.changePicture);
};
