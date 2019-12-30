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
  Qijia = mongoose.model('Qijia');
/**
 * Create an qijia
 */
exports.create = function (req, res) {
  var qijia = new Qijia(req.body);
  qijia.user = req.user;

  qijia.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(qijia);
    }
  });
};

/**
 * Show the current qijia
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var qijia = req.qijia ? req.qijia.toJSON() : {};

  // Add a custom field to the Qijia, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Qijia model.
  qijia.isCurrentUserOwner = !!(req.user && qijia.user && qijia.user._id.toString() === req.user._id.toString());

  res.json(qijia);
};

/**
 * Update an qijia
 */
exports.update = function (req, res) {
  var qijia = req.qijia;

  qijia.name = req.body.name;
  qijia.nameZH = req.body.nameZH;
  qijia.description = req.body.description;
  qijia.descriptionZH = req.body.descriptionZH;
  qijia.type = req.body.type;
  qijia.weight = req.body.weight;
  qijia.width = req.body.width;
  qijia.length = req.body.length;
  qijia.height = req.body.height;
  qijia.dynasty = req.body.dynasty;

  qijia.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(qijia);
    }
  });
};

/**
 * Delete an qijia
 */
exports.delete = function (req, res) {
  var qijia = req.qijia;

  qijia.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(qijia);
    }
  });
};

/**
 * List of Qijia
 */
exports.list = function (req, res) {
  Qijia.find().sort('-created').populate('user', 'displayName').exec(function (err, qijia) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(qijia);
    }
  });
};

/**
 * Qijia middleware
 */
exports.qijiaByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Qijia is invalid'
    });
  }

  Qijia.findById(id).populate('user', 'displayName').exec(function (err, qijia) {
    if (err) {
      return next(err);
    } else if (!qijia) {
      return res.status(404).send({
        message: 'No qijia with that identifier has been found'
      });
    }
    req.qijia = qijia;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change qijia image location.
  // var upload = multer(config.uploads.qijiaImageUpload).single('newPicture');
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

        Qijia.findById(req.body.qijiaId).exec(function (err, qijia) {
          if (!qijia) {
            return res.status(404).send({
              message: 'No qijia with that identifier has been found'
            });
          }

          qijia.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          qijia.save(function (saveError) {
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
