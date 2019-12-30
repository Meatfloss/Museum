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
  Lacquer = mongoose.model('Lacquer');
/**
 * Create an lacquer
 */
exports.create = function (req, res) {
  var lacquer = new Lacquer(req.body);
  lacquer.user = req.user;

  lacquer.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(lacquer);
    }
  });
};

/**
 * Show the current lacquer
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var lacquer = req.lacquer ? req.lacquer.toJSON() : {};

  // Add a custom field to the Lacquer, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Lacquer model.
  lacquer.isCurrentUserOwner = !!(req.user && lacquer.user && lacquer.user._id.toString() === req.user._id.toString());

  res.json(lacquer);
};

/**
 * Update an lacquer
 */
exports.update = function (req, res) {
  var lacquer = req.lacquer;

  lacquer.name = req.body.name;
  lacquer.nameZH = req.body.nameZH;
  lacquer.description = req.body.description;
  lacquer.descriptionZH = req.body.descriptionZH;
  lacquer.type = req.body.type;
  lacquer.weight = req.body.weight;
  lacquer.width = req.body.width;
  lacquer.length = req.body.length;
  lacquer.height = req.body.height;
  lacquer.dynasty = req.body.dynasty;

  lacquer.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(lacquer);
    }
  });
};

/**
 * Delete an lacquer
 */
exports.delete = function (req, res) {
  var lacquer = req.lacquer;

  lacquer.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(lacquer);
    }
  });
};

/**
 * List of Lacquer
 */
exports.list = function (req, res) {
  Lacquer.find().sort('-created').populate('user', 'displayName').exec(function (err, lacquer) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(lacquer);
    }
  });
};

/**
 * Lacquer middleware
 */
exports.lacquerByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Lacquer is invalid'
    });
  }

  Lacquer.findById(id).populate('user', 'displayName').exec(function (err, lacquer) {
    if (err) {
      return next(err);
    } else if (!lacquer) {
      return res.status(404).send({
        message: 'No lacquer with that identifier has been found'
      });
    }
    req.lacquer = lacquer;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change lacquer image location.
  // var upload = multer(config.uploads.lacquerImageUpload).single('newPicture');
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

        Lacquer.findById(req.body.lacquerId).exec(function (err, lacquer) {
          if (!lacquer) {
            return res.status(404).send({
              message: 'No lacquer with that identifier has been found'
            });
          }

          lacquer.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          lacquer.save(function (saveError) {
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
