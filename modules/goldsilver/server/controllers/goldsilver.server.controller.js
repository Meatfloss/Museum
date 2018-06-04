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
  Goldsilver = mongoose.model('Goldsilver');
/**
 * Create an goldsilver
 */
exports.create = function (req, res) {
  var goldsilver = new Goldsilver(req.body);
  goldsilver.user = req.user;

  goldsilver.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(goldsilver);
    }
  });
};

/**
 * Show the current goldsilver
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var goldsilver = req.goldsilver ? req.goldsilver.toJSON() : {};

  // Add a custom field to the Goldsilver, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Goldsilver model.
  goldsilver.isCurrentUserOwner = !!(req.user && goldsilver.user && goldsilver.user._id.toString() === req.user._id.toString());

  res.json(goldsilver);
};

/**
 * Update an goldsilver
 */
exports.update = function (req, res) {
  var goldsilver = req.goldsilver;

  goldsilver.name = req.body.name;
  goldsilver.nameZH = req.body.nameZH;
  goldsilver.description = req.body.description;
  goldsilver.descriptionZH = req.body.descriptionZH;
  goldsilver.type = req.body.type;
  goldsilver.weight = req.body.weight;  
  goldsilver.width = req.body.width;
  goldsilver.length = req.body.length;
  goldsilver.height = req.body.height;
  goldsilver.dynasty = req.body.dynasty;

  goldsilver.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(goldsilver);
    }
  });
};

/**
 * Delete an goldsilver
 */
exports.delete = function (req, res) {
  var goldsilver = req.goldsilver;

  goldsilver.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(goldsilver);
    }
  });
};

/**
 * List of Goldsilver
 */
exports.list = function (req, res) {
  Goldsilver.find().sort('-created').populate('user', 'displayName').exec(function (err, goldsilver) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(goldsilver);
    }
  });
};

/**
 * Goldsilver middleware
 */
exports.goldsilverByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Goldsilver is invalid'
    });
  }

  Goldsilver.findById(id).populate('user', 'displayName').exec(function (err, goldsilver) {
    if (err) {
      return next(err);
    } else if (!goldsilver) {
      return res.status(404).send({
        message: 'No goldsilver with that identifier has been found'
      });
    }
    req.goldsilver = goldsilver;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change goldsilver image location.
  // var upload = multer(config.uploads.goldsilverImageUpload).single('newPicture');
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

        Goldsilver.findById(req.body.goldsilverId).exec(function (err, goldsilver) {
          if (!goldsilver) {
            return res.status(404).send({
              message: 'No goldsilver with that identifier has been found'
            });
          }

          goldsilver.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          goldsilver.save(function (saveError) {
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
