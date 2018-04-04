'use strict';

/**
 * Module dependencies
 */
var bonesealPolicy = require('../policies/boneseal.server.policy'),
  boneseal = require('../controllers/boneseal.server.controller');

module.exports = function (app) {
  // Boneseal collection routes
  app.route('/api/boneseal').all(bonesealPolicy.isAllowed)
    .get(boneseal.list)
    .post(boneseal.create);

  // Single boneseal routes
  app.route('/api/boneseal/:bonesealId').all(bonesealPolicy.isAllowed)
    .get(boneseal.read)
    .put(boneseal.update)
    .delete(boneseal.delete);

  // Finish by binding the boneseal middleware
  app.param('bonesealId', boneseal.bonesealByID);

  app.route('/api/bonesealItem/picture')
  .post(boneseal.changePicture);
};
