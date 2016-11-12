'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  fs = require('fs'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  Famille = mongoose.model('Famille');
/**
 * Create an famille
 */
exports.create = function (req, res) {
  var famille = new Famille(req.body);
  famille.user = req.user;

  famille.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(famille);
    }
  });
};

/**
 * Show the current famille
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var famille = req.famille ? req.famille.toJSON() : {};

  // Add a custom field to the Famille, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Famille model.
  famille.isCurrentUserOwner = !!(req.user && famille.user && famille.user._id.toString() === req.user._id.toString());

  res.json(famille);
};

/**
 * Update an famille
 */
exports.update = function (req, res) {
  var famille = req.famille;

  famille.name = req.body.name;
  famille.nameZH = req.body.nameZH;
  famille.description = req.body.description;
  famille.descriptionZH = req.body.descriptionZH;
  famille.topDiameter = req.body.topDiameter;
  famille.botDiameter = req.body.botDiameter;
  famille.height = req.body.height;
  famille.dynasty = req.body.dynasty;

  famille.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(famille);
    }
  });
};

/**
 * Delete an famille
 */
exports.delete = function (req, res) {
  var famille = req.famille;

  famille.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(famille);
    }
  });
};

/**
 * List of Familles
 */
exports.list = function (req, res) {
  Famille.find().sort('-created').populate('user', 'displayName').exec(function (err, familles) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(familles);
    }
  });
};

/**
 * Famille middleware
 */
exports.familleByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Famille is invalid'
    });
  }

  Famille.findById(id).populate('user', 'displayName').exec(function (err, famille) {
    if (err) {
      return next(err);
    } else if (!famille) {
      return res.status(404).send({
        message: 'No famille with that identifier has been found'
      });
    }
    req.famille = famille;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change famille image location.
  // var upload = multer(config.uploads.familleImageUpload).single('newPicture');
  var upload = multer(config.uploads.profileUpload).single('newPicture');
  var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;

  // Filtering to upload only images
  upload.fileFilter = profileUploadFileFilter;
  if (user) {
    upload(req, res, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading profile picture'
        });
      } else {

        Famille.findById(req.body.familleId).exec(function (err, famille) {
          if (!famille) {
            return res.status(404).send({
              message: 'No famille with that identifier has been found'
            });
          }

          famille.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          famille.save(function (saveError) {
            if (saveError) {
              return res.status(400).send({
                message: errorHandler.getErrorMessage(saveError)
              });
            } else {
              req.login(user, function (err) {
                if (err) {
                  res.status(400).send(err);
                } else {

                  res.json(user);
                }
              });
            }
          });
        });

      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};
