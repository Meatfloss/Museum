'use strict';

/**
 * Module dependencies
 */
var qporcelainsPolicy = require('../policies/qporcelains.server.policy'),
  qporcelains = require('../controllers/qporcelains.server.controller');

module.exports = function (app) {
  // Qporcelains collection routes
  app.route('/api/qporcelains').all(qporcelainsPolicy.isAllowed)
    .get(qporcelains.list)
    .post(qporcelains.create);

  // Qporcelains collection routes
  app.route('/api/qporcelains/:dynasty/:category').all(qporcelainsPolicy.isAllowed)
    .get(qporcelains.filteredList);

  // Single qporcelains routes
  app.route('/api/qporcelains/:qporcelainsId').all(qporcelainsPolicy.isAllowed)
    .get(qporcelains.read)
    .put(qporcelains.update)
    .delete(qporcelains.delete);

  // Finish by binding the qporcelains middleware
  app.param('qporcelainsId', qporcelains.qporcelainsByID);

  app.route('/api/qporcelainsItem/picture')
    .post(qporcelains.changePicture);
};
