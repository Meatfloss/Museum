'use strict';

/**
 * Module dependencies
 */
var japanesePolicy = require('../policies/japanese.server.policy'),
  japanese = require('../controllers/japanese.server.controller');

module.exports = function (app) {
  // Japanese collection routes
  app.route('/api/japanese').all(japanesePolicy.isAllowed)
    .get(japanese.list)
    .post(japanese.create);

  // Japanese collection routes
  app.route('/api/japanese/:dynasty/:category').all(japanesePolicy.isAllowed)
    .get(japanese.filteredList);

  // Single japanese routes
  app.route('/api/japanese/:japaneseId').all(japanesePolicy.isAllowed)
    .get(japanese.read)
    .put(japanese.update)
    .delete(japanese.delete);

  // Finish by binding the japanese middleware
  app.param('japaneseId', japanese.japaneseByID);

  app.route('/api/japaneseItem/picture')
    .post(japanese.changePicture);
};
