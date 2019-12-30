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
  Bronzepainted = mongoose.model('Bronzepainted');
/**
 * Create an bronzepainted
 */
exports.create = function (req, res) {
  var bronzepainted = new Bronzepainted(req.body);
  bronzepainted.user = req.user;

  bronzepainted.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bronzepainted);
    }
  });
};

/**
 * Show the current bronzepainted
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var bronzepainted = req.bronzepainted ? req.bronzepainted.toJSON() : {};

  // Add a custom field to the Bronzepainted, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Bronzepainted model.
  bronzepainted.isCurrentUserOwner = !!(req.user && bronzepainted.user && bronzepainted.user._id.toString() === req.user._id.toString());

  res.json(bronzepainted);
};

/**
 * Update an bronzepainted
 */
exports.update = function (req, res) {
  var bronzepainted = req.bronzepainted;

  bronzepainted.name = req.body.name;
  bronzepainted.nameZH = req.body.nameZH;
  bronzepainted.description = req.body.description;
  bronzepainted.descriptionZH = req.body.descriptionZH;
  bronzepainted.type = req.body.type;
  bronzepainted.weight = req.body.weight;
  bronzepainted.width = req.body.width;
  bronzepainted.length = req.body.length;
  bronzepainted.height = req.body.height;
  bronzepainted.dynasty = req.body.dynasty;

  bronzepainted.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bronzepainted);
    }
  });
};

/**
 * Delete an bronzepainted
 */
exports.delete = function (req, res) {
  var bronzepainted = req.bronzepainted;

  bronzepainted.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bronzepainted);
    }
  });
};

/**
 * List of Bronzepainted
 */
exports.list = function (req, res) {
  Bronzepainted.find().sort('-created').populate('user', 'displayName').exec(function (err, bronzepainted) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bronzepainted);
    }
  });
};

/**
 * Bronzepainted middleware
 */
exports.bronzepaintedByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Bronzepainted is invalid'
    });
  }

  Bronzepainted.findById(id).populate('user', 'displayName').exec(function (err, bronzepainted) {
    if (err) {
      return next(err);
    } else if (!bronzepainted) {
      return res.status(404).send({
        message: 'No bronzepainted with that identifier has been found'
      });
    }
    req.bronzepainted = bronzepainted;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change bronzepainted image location.
  // var upload = multer(config.uploads.bronzepaintedImageUpload).single('newPicture');
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

        Bronzepainted.findById(req.body.bronzepaintedId).exec(function (err, bronzepainted) {
          if (!bronzepainted) {
            return res.status(404).send({
              message: 'No bronzepainted with that identifier has been found'
            });
          }

          bronzepainted.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          bronzepainted.save(function (saveError) {
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
