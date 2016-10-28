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
  Enamel = mongoose.model('Enamel');
/**
 * Create an enamel
 */
exports.create = function (req, res) {
  var enamel = new Enamel(req.body);
  enamel.user = req.user;

  enamel.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(enamel);
    }
  });
};

/**
 * Show the current enamel
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var enamel = req.enamel ? req.enamel.toJSON() : {};

  // Add a custom field to the Enamel, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Enamel model.
  enamel.isCurrentUserOwner = !!(req.user && enamel.user && enamel.user._id.toString() === req.user._id.toString());

  res.json(enamel);
};

/**
 * Update an enamel
 */
exports.update = function (req, res) {
  var enamel = req.enamel;

  enamel.name = req.body.name;
  enamel.description = req.body.description;
  enamel.type = req.body.type;
  enamel.width = req.body.width;
  enamel.length = req.body.length;
  enamel.height = req.body.height;
  enamel.dynasty = req.body.dynasty;

  enamel.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(enamel);
    }
  });
};

/**
 * Delete an enamel
 */
exports.delete = function (req, res) {
  var enamel = req.enamel;

  enamel.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(enamel);
    }
  });
};

/**
 * List of Enamels
 */
exports.list = function (req, res) {
  Enamel.find().sort('-created').populate('user', 'displayName').exec(function (err, enamels) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(enamels);
    }
  });
};

/**
 * Enamel middleware
 */
exports.enamelByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Enamel is invalid'
    });
  }

  Enamel.findById(id).populate('user', 'displayName').exec(function (err, enamel) {
    if (err) {
      return next(err);
    } else if (!enamel) {
      return res.status(404).send({
        message: 'No enamel with that identifier has been found'
      });
    }
    req.enamel = enamel;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change enamel image location.
  // var upload = multer(config.uploads.enamelImageUpload).single('newPicture');
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

        Enamel.findById(req.body.enamelId).exec(function (err, enamel) {
          if (!enamel) {
            return res.status(404).send({
              message: 'No enamel with that identifier has been found'
            });
          }

          enamel.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          enamel.save(function (saveError) {
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
