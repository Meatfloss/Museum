'use strict';

/**
 * Module dependencies
 */
var authorsPolicy = require('../policies/authors.server.policy'),
  authors = require('../controllers/authors.server.controller');

module.exports = function (app) {
  // Authors collection routes
  app.route('/api/authors').all(authorsPolicy.isAllowed)
    .get(authors.list)
    .post(authors.create);

  // Single author routes
  app.route('/api/authors/:authorId').all(authorsPolicy.isAllowed)
    .get(authors.read)
    .put(authors.update)
    .delete(authors.delete);

  // Finish by binding the author middleware
  app.param('authorId', authors.authorByID);
};
