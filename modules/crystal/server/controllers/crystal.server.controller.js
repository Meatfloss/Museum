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
  Crystal = mongoose.model('Crystal');
/**
 * Create an crystal
 */
exports.create = function (req, res) {
  var crystal = new Crystal(req.body);
  crystal.user = req.user;

  crystal.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(crystal);
    }
  });
};

/**
 * Show the current crystal
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var crystal = req.crystal ? req.crystal.toJSON() : {};

  // Add a custom field to the Crystal, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Crystal model.
  crystal.isCurrentUserOwner = !!(req.user && crystal.user && crystal.user._id.toString() === req.user._id.toString());

  res.json(crystal);
};

/**
 * Update an crystal
 */
exports.update = function (req, res) {
  var crystal = req.crystal;

  crystal.name = req.body.name;
  crystal.nameZH = req.body.nameZH;
  crystal.description = req.body.description;
  crystal.descriptionZH = req.body.descriptionZH;
  crystal.type = req.body.type;
  crystal.weight = req.body.weight;
  crystal.width = req.body.width;
  crystal.length = req.body.length;
  crystal.height = req.body.height;
  crystal.dynasty = req.body.dynasty;

  crystal.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(crystal);
    }
  });
};

/**
 * Delete an crystal
 */
exports.delete = function (req, res) {
  var crystal = req.crystal;

  crystal.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(crystal);
    }
  });
};

/**
 * List of Crystal
 */
exports.list = function (req, res) {
  Crystal.find().sort('-created').populate('user', 'displayName').exec(function (err, crystal) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(crystal);
    }
  });
};

/**
 * Crystal middleware
 */
exports.crystalByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Crystal is invalid'
    });
  }

  Crystal.findById(id).populate('user', 'displayName').exec(function (err, crystal) {
    if (err) {
      return next(err);
    } else if (!crystal) {
      return res.status(404).send({
        message: 'No crystal with that identifier has been found'
      });
    }
    req.crystal = crystal;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change crystal image location.
  // var upload = multer(config.uploads.crystalImageUpload).single('newPicture');
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

        Crystal.findById(req.body.crystalId).exec(function (err, crystal) {
          if (!crystal) {
            return res.status(404).send({
              message: 'No crystal with that identifier has been found'
            });
          }

          crystal.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          crystal.save(function (saveError) {
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
