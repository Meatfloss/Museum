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
  Snuff = mongoose.model('Snuff');
/**
 * Create an snuff
 */
exports.create = function (req, res) {
  var snuff = new Snuff(req.body);
  snuff.user = req.user;

  snuff.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(snuff);
    }
  });
};

/**
 * Show the current snuff
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var snuff = req.snuff ? req.snuff.toJSON() : {};

  // Add a custom field to the Snuff, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Snuff model.
  snuff.isCurrentUserOwner = !!(req.user && snuff.user && snuff.user._id.toString() === req.user._id.toString());

  res.json(snuff);
};

/**
 * Update an snuff
 */
exports.update = function (req, res) {
  var snuff = req.snuff;

  snuff.name = req.body.name;
  snuff.nameZH = req.body.nameZH;
  snuff.description = req.body.description;
  snuff.descriptionZH = req.body.descriptionZH;
  snuff.type = req.body.type;
  snuff.weight = req.body.weight;  
  snuff.width = req.body.width;
  snuff.length = req.body.length;
  snuff.height = req.body.height;
  snuff.dynasty = req.body.dynasty;

  snuff.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(snuff);
    }
  });
};

/**
 * Delete an snuff
 */
exports.delete = function (req, res) {
  var snuff = req.snuff;

  snuff.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(snuff);
    }
  });
};

/**
 * List of Snuff
 */
exports.list = function (req, res) {
  Snuff.find().sort('-created').populate('user', 'displayName').exec(function (err, snuff) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(snuff);
    }
  });
};

/**
 * Snuff middleware
 */
exports.snuffByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Snuff is invalid'
    });
  }

  Snuff.findById(id).populate('user', 'displayName').exec(function (err, snuff) {
    if (err) {
      return next(err);
    } else if (!snuff) {
      return res.status(404).send({
        message: 'No snuff with that identifier has been found'
      });
    }
    req.snuff = snuff;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change snuff image location.
  // var upload = multer(config.uploads.snuffImageUpload).single('newPicture');
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

        Snuff.findById(req.body.snuffId).exec(function (err, snuff) {
          if (!snuff) {
            return res.status(404).send({
              message: 'No snuff with that identifier has been found'
            });
          }

          snuff.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          snuff.save(function (saveError) {
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
