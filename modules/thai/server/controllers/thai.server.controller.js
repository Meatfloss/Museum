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
  Thai = mongoose.model('Thai');
/**
 * Create an thai
 */
exports.create = function (req, res) {
  var thai = new Thai(req.body);
  thai.user = req.user;

  thai.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(thai);
    }
  });
};

/**
 * Show the current thai
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var thai = req.thai ? req.thai.toJSON() : {};

  // Add a custom field to the Thai, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Thai model.
  thai.isCurrentUserOwner = !!(req.user && thai.user && thai.user._id.toString() === req.user._id.toString());

  res.json(thai);
};

/**
 * Update an thai
 */
exports.update = function (req, res) {
  var thai = req.thai;

  thai.name = req.body.name;
  thai.nameZH = req.body.nameZH;
  thai.description = req.body.description;
  thai.descriptionZH = req.body.descriptionZH;
  thai.type = req.body.type;
  thai.weight = req.body.weight;
  thai.width = req.body.width;
  thai.length = req.body.length;
  thai.height = req.body.height;
  thai.dynasty = req.body.dynasty;

  thai.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(thai);
    }
  });
};

/**
 * Delete an thai
 */
exports.delete = function (req, res) {
  var thai = req.thai;

  thai.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(thai);
    }
  });
};

/**
 * List of Thai
 */
exports.list = function (req, res) {
  Thai.find().sort('-created').populate('user', 'displayName').exec(function (err, thai) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(thai);
    }
  });
};

/**
 * Thai middleware
 */
exports.thaiByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Thai is invalid'
    });
  }

  Thai.findById(id).populate('user', 'displayName').exec(function (err, thai) {
    if (err) {
      return next(err);
    } else if (!thai) {
      return res.status(404).send({
        message: 'No thai with that identifier has been found'
      });
    }
    req.thai = thai;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change thai image location.
  // var upload = multer(config.uploads.thaiImageUpload).single('newPicture');
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

        Thai.findById(req.body.thaiId).exec(function (err, thai) {
          if (!thai) {
            return res.status(404).send({
              message: 'No thai with that identifier has been found'
            });
          }

          thai.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          thai.save(function (saveError) {
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
