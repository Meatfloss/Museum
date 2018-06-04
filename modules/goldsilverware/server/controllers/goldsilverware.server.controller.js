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
  Goldsilverware = mongoose.model('Goldsilverware');
/**
 * Create an goldsilverware
 */
exports.create = function (req, res) {
  var goldsilverware = new Goldsilverware(req.body);
  goldsilverware.user = req.user;

  goldsilverware.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(goldsilverware);
    }
  });
};

/**
 * Show the current goldsilverware
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var goldsilverware = req.goldsilverware ? req.goldsilverware.toJSON() : {};

  // Add a custom field to the Goldsilverware, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Goldsilverware model.
  goldsilverware.isCurrentUserOwner = !!(req.user && goldsilverware.user && goldsilverware.user._id.toString() === req.user._id.toString());

  res.json(goldsilverware);
};

/**
 * Update an goldsilverware
 */
exports.update = function (req, res) {
  var goldsilverware = req.goldsilverware;

  goldsilverware.name = req.body.name;
  goldsilverware.nameZH = req.body.nameZH;
  goldsilverware.description = req.body.description;
  goldsilverware.descriptionZH = req.body.descriptionZH;
  goldsilverware.type = req.body.type;
  goldsilverware.weight = req.body.weight;  
  goldsilverware.width = req.body.width;
  goldsilverware.length = req.body.length;
  goldsilverware.height = req.body.height;
  goldsilverware.dynasty = req.body.dynasty;

  goldsilverware.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(goldsilverware);
    }
  });
};

/**
 * Delete an goldsilverware
 */
exports.delete = function (req, res) {
  var goldsilverware = req.goldsilverware;

  goldsilverware.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(goldsilverware);
    }
  });
};

/**
 * List of Goldsilverware
 */
exports.list = function (req, res) {
  Goldsilverware.find().sort('-created').populate('user', 'displayName').exec(function (err, goldsilverware) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(goldsilverware);
    }
  });
};

/**
 * Goldsilverware middleware
 */
exports.goldsilverwareByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Goldsilverware is invalid'
    });
  }

  Goldsilverware.findById(id).populate('user', 'displayName').exec(function (err, goldsilverware) {
    if (err) {
      return next(err);
    } else if (!goldsilverware) {
      return res.status(404).send({
        message: 'No goldsilverware with that identifier has been found'
      });
    }
    req.goldsilverware = goldsilverware;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change goldsilverware image location.
  // var upload = multer(config.uploads.goldsilverwareImageUpload).single('newPicture');
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

        Goldsilverware.findById(req.body.goldsilverwareId).exec(function (err, goldsilverware) {
          if (!goldsilverware) {
            return res.status(404).send({
              message: 'No goldsilverware with that identifier has been found'
            });
          }

          goldsilverware.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          goldsilverware.save(function (saveError) {
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
