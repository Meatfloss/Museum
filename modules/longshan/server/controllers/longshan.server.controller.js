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
  Longshan = mongoose.model('Longshan');
/**
 * Create an longshan
 */
exports.create = function (req, res) {
  var longshan = new Longshan(req.body);
  longshan.user = req.user;

  longshan.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(longshan);
    }
  });
};

/**
 * Show the current longshan
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var longshan = req.longshan ? req.longshan.toJSON() : {};

  // Add a custom field to the Longshan, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Longshan model.
  longshan.isCurrentUserOwner = !!(req.user && longshan.user && longshan.user._id.toString() === req.user._id.toString());

  res.json(longshan);
};

/**
 * Update an longshan
 */
exports.update = function (req, res) {
  var longshan = req.longshan;

  longshan.name = req.body.name;
  longshan.nameZH = req.body.nameZH;
  longshan.description = req.body.description;
  longshan.descriptionZH = req.body.descriptionZH;
  longshan.type = req.body.type;
  longshan.weight = req.body.weight;
  longshan.width = req.body.width;
  longshan.length = req.body.length;
  longshan.height = req.body.height;
  longshan.dynasty = req.body.dynasty;

  longshan.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(longshan);
    }
  });
};

/**
 * Delete an longshan
 */
exports.delete = function (req, res) {
  var longshan = req.longshan;

  longshan.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(longshan);
    }
  });
};

/**
 * List of Longshan
 */
exports.list = function (req, res) {
  Longshan.find().sort('-created').populate('user', 'displayName').exec(function (err, longshan) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(longshan);
    }
  });
};

/**
 * Longshan middleware
 */
exports.longshanByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Longshan is invalid'
    });
  }

  Longshan.findById(id).populate('user', 'displayName').exec(function (err, longshan) {
    if (err) {
      return next(err);
    } else if (!longshan) {
      return res.status(404).send({
        message: 'No longshan with that identifier has been found'
      });
    }
    req.longshan = longshan;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change longshan image location.
  // var upload = multer(config.uploads.longshanImageUpload).single('newPicture');
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

        Longshan.findById(req.body.longshanId).exec(function (err, longshan) {
          if (!longshan) {
            return res.status(404).send({
              message: 'No longshan with that identifier has been found'
            });
          }

          longshan.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          longshan.save(function (saveError) {
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
