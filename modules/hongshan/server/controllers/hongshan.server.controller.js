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
  Hongshan = mongoose.model('Hongshan');
/**
 * Create an hongshan
 */
exports.create = function (req, res) {
  var hongshan = new Hongshan(req.body);
  hongshan.user = req.user;

  hongshan.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(hongshan);
    }
  });
};

/**
 * Show the current hongshan
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var hongshan = req.hongshan ? req.hongshan.toJSON() : {};

  // Add a custom field to the Hongshan, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Hongshan model.
  hongshan.isCurrentUserOwner = !!(req.user && hongshan.user && hongshan.user._id.toString() === req.user._id.toString());

  res.json(hongshan);
};

/**
 * Update an hongshan
 */
exports.update = function (req, res) {
  var hongshan = req.hongshan;

  hongshan.name = req.body.name;
  hongshan.nameZH = req.body.nameZH;
  hongshan.description = req.body.description;
  hongshan.descriptionZH = req.body.descriptionZH;
  hongshan.type = req.body.type;
  hongshan.width = req.body.width;
  hongshan.length = req.body.length;
  hongshan.height = req.body.height;
  hongshan.dynasty = req.body.dynasty;

  hongshan.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(hongshan);
    }
  });
};

/**
 * Delete an hongshan
 */
exports.delete = function (req, res) {
  var hongshan = req.hongshan;

  hongshan.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(hongshan);
    }
  });
};

/**
 * List of Hongshan
 */
exports.list = function (req, res) {
  Hongshan.find().sort('-created').populate('user', 'displayName').exec(function (err, hongshan) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(hongshan);
    }
  });
};

/**
 * Hongshan middleware
 */
exports.hongshanByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Hongshan is invalid'
    });
  }

  Hongshan.findById(id).populate('user', 'displayName').exec(function (err, hongshan) {
    if (err) {
      return next(err);
    } else if (!hongshan) {
      return res.status(404).send({
        message: 'No hongshan with that identifier has been found'
      });
    }
    req.hongshan = hongshan;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change hongshan image location.
  // var upload = multer(config.uploads.hongshanImageUpload).single('newPicture');
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

        Hongshan.findById(req.body.hongshanId).exec(function (err, hongshan) {
          if (!hongshan) {
            return res.status(404).send({
              message: 'No hongshan with that identifier has been found'
            });
          }

          hongshan.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          hongshan.save(function (saveError) {
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
