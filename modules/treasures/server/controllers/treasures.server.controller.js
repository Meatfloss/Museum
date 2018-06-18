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
  Treasures = mongoose.model('Treasures');
/**
 * Create an treasures
 */
exports.create = function (req, res) {
  var treasures = new Treasures(req.body);
  treasures.user = req.user;

  treasures.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(treasures);
    }
  });
};

/**
 * Show the current treasures
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var treasures = req.treasures ? req.treasures.toJSON() : {};

  // Add a custom field to the Treasures, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Treasures model.
  treasures.isCurrentUserOwner = !!(req.user && treasures.user && treasures.user._id.toString() === req.user._id.toString());

  res.json(treasures);
};

/**
 * Update an treasures
 */
exports.update = function (req, res) {
  var treasures = req.treasures;

  treasures.name = req.body.name;
  treasures.nameZH = req.body.nameZH;
  treasures.description = req.body.description;
  treasures.descriptionZH = req.body.descriptionZH;
  treasures.type = req.body.type;
  treasures.weight = req.body.weight;  
  treasures.width = req.body.width;
  treasures.length = req.body.length;
  treasures.height = req.body.height;
  treasures.dynasty = req.body.dynasty;

  treasures.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(treasures);
    }
  });
};

/**
 * Delete an treasures
 */
exports.delete = function (req, res) {
  var treasures = req.treasures;

  treasures.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(treasures);
    }
  });
};

/**
 * List of Treasures
 */
exports.list = function (req, res) {
  Treasures.find().sort('-created').populate('user', 'displayName').exec(function (err, treasures) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(treasures);
    }
  });
};

/**
 * Treasures middleware
 */
exports.treasuresByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Treasures is invalid'
    });
  }

  Treasures.findById(id).populate('user', 'displayName').exec(function (err, treasures) {
    if (err) {
      return next(err);
    } else if (!treasures) {
      return res.status(404).send({
        message: 'No treasures with that identifier has been found'
      });
    }
    req.treasures = treasures;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change treasures image location.
  // var upload = multer(config.uploads.treasuresImageUpload).single('newPicture');
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

        Treasures.findById(req.body.treasuresId).exec(function (err, treasures) {
          if (!treasures) {
            return res.status(404).send({
              message: 'No treasures with that identifier has been found'
            });
          }

          treasures.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          treasures.save(function (saveError) {
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
