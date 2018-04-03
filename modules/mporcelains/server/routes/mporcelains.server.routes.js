'use strict';

/**
 * Module dependencies
 */
var mporcelainsPolicy = require('../policies/mporcelains.server.policy'),
  mporcelains = require('../controllers/mporcelains.server.controller');

module.exports = function (app) {
  // Mporcelains collection routes
  app.route('/api/mporcelains').all(mporcelainsPolicy.isAllowed)
    .get(mporcelains.list)
    .post(mporcelains.create);

  // Mporcelains collection routes
  app.route('/api/mporcelains/:dynasty/:category').all(mporcelainsPolicy.isAllowed)
    .get(mporcelains.filteredList);

  // Single mporcelains routes
  app.route('/api/mporcelains/:mporcelainsId').all(mporcelainsPolicy.isAllowed)
    .get(mporcelains.read)
    .put(mporcelains.update)
    .delete(mporcelains.delete);

  // Finish by binding the mporcelains middleware
  app.param('mporcelainsId', mporcelains.mporcelainsByID);

  app.route('/api/mporcelainsItem/picture')
    .post(mporcelains.changePicture);
};
