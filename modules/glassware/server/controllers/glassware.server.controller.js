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
  Glassware = mongoose.model('Glassware');
/**
 * Create an glassware
 */
exports.create = function (req, res) {
  var glassware = new Glassware(req.body);
  glassware.user = req.user;

  glassware.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(glassware);
    }
  });
};

/**
 * Show the current glassware
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var glassware = req.glassware ? req.glassware.toJSON() : {};

  // Add a custom field to the Glassware, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Glassware model.
  glassware.isCurrentUserOwner = !!(req.user && glassware.user && glassware.user._id.toString() === req.user._id.toString());

  res.json(glassware);
};

/**
 * Update an glassware
 */
exports.update = function (req, res) {
  var glassware = req.glassware;

  glassware.name = req.body.name;
  glassware.nameZH = req.body.nameZH;
  glassware.description = req.body.description;
  glassware.descriptionZH = req.body.descriptionZH;
  glassware.type = req.body.type;
  glassware.weight = req.body.weight;
  glassware.width = req.body.width;
  glassware.length = req.body.length;
  glassware.height = req.body.height;
  glassware.dynasty = req.body.dynasty;

  glassware.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(glassware);
    }
  });
};

/**
 * Delete an glassware
 */
exports.delete = function (req, res) {
  var glassware = req.glassware;

  glassware.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(glassware);
    }
  });
};

/**
 * List of Glassware
 */
exports.list = function (req, res) {
  Glassware.find().sort('-created').populate('user', 'displayName').exec(function (err, glassware) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(glassware);
    }
  });
};

/**
 * Glassware middleware
 */
exports.glasswareByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Glassware is invalid'
    });
  }

  Glassware.findById(id).populate('user', 'displayName').exec(function (err, glassware) {
    if (err) {
      return next(err);
    } else if (!glassware) {
      return res.status(404).send({
        message: 'No glassware with that identifier has been found'
      });
    }
    req.glassware = glassware;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change glassware image location.
  // var upload = multer(config.uploads.glasswareImageUpload).single('newPicture');
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

        Glassware.findById(req.body.glasswareId).exec(function (err, glassware) {
          if (!glassware) {
            return res.status(404).send({
              message: 'No glassware with that identifier has been found'
            });
          }

          glassware.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          glassware.save(function (saveError) {
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
