'use strict';

/**
 * Module dependencies
 */
var paintingsPolicy = require('../policies/paintings.server.policy'),
  paintings = require('../controllers/paintings.server.controller');

module.exports = function (app) {
  // Paintings collection routes
  app.route('/api/paintings').all(paintingsPolicy.isAllowed)
    .get(paintings.list)
    .post(paintings.create);

  // Single painting routes
  app.route('/api/paintings/:paintingId').all(paintingsPolicy.isAllowed)
    .get(paintings.read)
    .put(paintings.update)
    .delete(paintings.delete);

  app.get('/api/paintings/byauthor/:authorId', paintingsPolicy.isAllowed, paintings.paintingByAuthorID);


  // Finish by binding the painting middleware
  app.param('paintingId', paintings.paintingByID);


  app.route('/api/painting/picture')
    .post(paintings.changePicture);
};
