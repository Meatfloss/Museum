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
  Fourtreasure = mongoose.model('Fourtreasure');
/**
 * Create an fourtreasure
 */
exports.create = function (req, res) {
  var fourtreasure = new Fourtreasure(req.body);
  fourtreasure.user = req.user;

  fourtreasure.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(fourtreasure);
    }
  });
};

/**
 * Show the current fourtreasure
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var fourtreasure = req.fourtreasure ? req.fourtreasure.toJSON() : {};

  // Add a custom field to the Fourtreasure, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Fourtreasure model.
  fourtreasure.isCurrentUserOwner = !!(req.user && fourtreasure.user && fourtreasure.user._id.toString() === req.user._id.toString());

  res.json(fourtreasure);
};

/**
 * Update an fourtreasure
 */
exports.update = function (req, res) {
  var fourtreasure = req.fourtreasure;

  fourtreasure.name = req.body.name;
  fourtreasure.nameZH = req.body.nameZH;
  fourtreasure.description = req.body.description;
  fourtreasure.descriptionZH = req.body.descriptionZH;
  fourtreasure.type = req.body.type;
  fourtreasure.weight = req.body.weight;  
  fourtreasure.width = req.body.width;
  fourtreasure.length = req.body.length;
  fourtreasure.height = req.body.height;
  fourtreasure.dynasty = req.body.dynasty;

  fourtreasure.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(fourtreasure);
    }
  });
};

/**
 * Delete an fourtreasure
 */
exports.delete = function (req, res) {
  var fourtreasure = req.fourtreasure;

  fourtreasure.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(fourtreasure);
    }
  });
};

/**
 * List of Fourtreasure
 */
exports.list = function (req, res) {
  Fourtreasure.find().sort('-created').populate('user', 'displayName').exec(function (err, fourtreasure) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(fourtreasure);
    }
  });
};

/**
 * Fourtreasure middleware
 */
exports.fourtreasureByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Fourtreasure is invalid'
    });
  }

  Fourtreasure.findById(id).populate('user', 'displayName').exec(function (err, fourtreasure) {
    if (err) {
      return next(err);
    } else if (!fourtreasure) {
      return res.status(404).send({
        message: 'No fourtreasure with that identifier has been found'
      });
    }
    req.fourtreasure = fourtreasure;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change fourtreasure image location.
  // var upload = multer(config.uploads.fourtreasureImageUpload).single('newPicture');
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

        Fourtreasure.findById(req.body.fourtreasureId).exec(function (err, fourtreasure) {
          if (!fourtreasure) {
            return res.status(404).send({
              message: 'No fourtreasure with that identifier has been found'
            });
          }

          fourtreasure.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          fourtreasure.save(function (saveError) {
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
