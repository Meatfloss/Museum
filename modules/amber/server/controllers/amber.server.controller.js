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
  Amber = mongoose.model('Amber');
/**
 * Create an amber
 */
exports.create = function (req, res) {
  var amber = new Amber(req.body);
  amber.user = req.user;

  amber.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(amber);
    }
  });
};

/**
 * Show the current amber
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var amber = req.amber ? req.amber.toJSON() : {};

  // Add a custom field to the Amber, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Amber model.
  amber.isCurrentUserOwner = !!(req.user && amber.user && amber.user._id.toString() === req.user._id.toString());

  res.json(amber);
};

/**
 * Update an amber
 */
exports.update = function (req, res) {
  var amber = req.amber;

  amber.name = req.body.name;
  amber.nameZH = req.body.nameZH;
  amber.description = req.body.description;
  amber.descriptionZH = req.body.descriptionZH;
  amber.type = req.body.type;
  amber.weight = req.body.weight;  
  amber.width = req.body.width;
  amber.length = req.body.length;
  amber.height = req.body.height;
  amber.dynasty = req.body.dynasty;

  amber.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(amber);
    }
  });
};

/**
 * Delete an amber
 */
exports.delete = function (req, res) {
  var amber = req.amber;

  amber.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(amber);
    }
  });
};

/**
 * List of Amber
 */
exports.list = function (req, res) {
  Amber.find().sort('-created').populate('user', 'displayName').exec(function (err, amber) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(amber);
    }
  });
};

/**
 * Amber middleware
 */
exports.amberByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Amber is invalid'
    });
  }

  Amber.findById(id).populate('user', 'displayName').exec(function (err, amber) {
    if (err) {
      return next(err);
    } else if (!amber) {
      return res.status(404).send({
        message: 'No amber with that identifier has been found'
      });
    }
    req.amber = amber;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change amber image location.
  // var upload = multer(config.uploads.amberImageUpload).single('newPicture');
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

        Amber.findById(req.body.amberId).exec(function (err, amber) {
          if (!amber) {
            return res.status(404).send({
              message: 'No amber with that identifier has been found'
            });
          }

          amber.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          amber.save(function (saveError) {
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
