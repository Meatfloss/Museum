'use strict';

/**
 * Module dependencies
 */
var bonePolicy = require('../policies/bone.server.policy'),
  bone = require('../controllers/bone.server.controller');

module.exports = function (app) {
  // Bone collection routes
  app.route('/api/bone').all(bonePolicy.isAllowed)
    .get(bone.list)
    .post(bone.create);

  // Single bone routes
  app.route('/api/bone/:boneId').all(bonePolicy.isAllowed)
    .get(bone.read)
    .put(bone.update)
    .delete(bone.delete);

  // Finish by binding the bone middleware
  app.param('boneId', bone.boneByID);

  app.route('/api/boneItem/picture')
  .post(bone.changePicture);
};
