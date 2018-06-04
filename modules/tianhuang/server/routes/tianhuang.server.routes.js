'use strict';

/**
 * Module dependencies
 */
var tianhuangPolicy = require('../policies/tianhuang.server.policy'),
  tianhuang = require('../controllers/tianhuang.server.controller');

module.exports = function (app) {
  // Tianhuang collection routes
  app.route('/api/tianhuang').all(tianhuangPolicy.isAllowed)
    .get(tianhuang.list)
    .post(tianhuang.create);

  // Single tianhuang routes
  app.route('/api/tianhuang/:tianhuangId').all(tianhuangPolicy.isAllowed)
    .get(tianhuang.read)
    .put(tianhuang.update)
    .delete(tianhuang.delete);

  // Finish by binding the tianhuang middleware
  app.param('tianhuangId', tianhuang.tianhuangByID);

  app.route('/api/tianhuangItem/picture')
  .post(tianhuang.changePicture);
};
