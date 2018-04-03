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
  Yporcelains = mongoose.model('Yporcelains');
/**
 * Create an yporcelains
 */
exports.create = function (req, res) {
  var yporcelains = new Yporcelains(req.body);
  yporcelains.user = req.user;

  yporcelains.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(yporcelains);
    }
  });
};

/**
 * Show the current yporcelains
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var yporcelains = req.yporcelains ? req.yporcelains.toJSON() : {};

  // Add a custom field to the Yporcelains, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Yporcelains model.
  yporcelains.isCurrentUserOwner = !!(req.user && yporcelains.user && yporcelains.user._id.toString() === req.user._id.toString());

  res.json(yporcelains);
};

/**
 * Update an yporcelains
 */
exports.update = function (req, res) {
  var yporcelains = req.yporcelains;

  yporcelains.name = req.body.name;
  yporcelains.nameZH = req.body.nameZH;
  yporcelains.description = req.body.description;
  yporcelains.descriptionZH = req.body.descriptionZH;
  yporcelains.topDiameter = req.body.topDiameter;
  yporcelains.botDiameter = req.body.botDiameter;
  yporcelains.height = req.body.height;
  yporcelains.dynasty = req.body.dynasty;
  yporcelains.reignTitle = req.body.reignTitle;

  yporcelains.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(yporcelains);
    }
  });
};

/**
 * Delete an yporcelains
 */
exports.delete = function (req, res) {
  var yporcelains = req.yporcelains;

  yporcelains.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(yporcelains);
    }
  });
};

/**
 * List of Yporcelains
 */
exports.list = function (req, res) {
  Yporcelains.find().sort('-created').populate('user', 'displayName').exec(function (err, yporcelains) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(yporcelains);
    }
  });
};

/**
 * Yporcelains middleware
 */
exports.yporcelainsByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Yporcelains is invalid'
    });
  }

  Yporcelains.findById(id).populate('user', 'displayName').exec(function (err, yporcelains) {
    if (err) {
      return next(err);
    } else if (!yporcelains) {
      return res.status(404).send({
        message: 'No yporcelains with that identifier has been found'
      });
    }
    req.yporcelains = yporcelains;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change yporcelains image location.
  // var upload = multer(config.uploads.yporcelainsImageUpload).single('newPicture');
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

        Yporcelains.findById(req.body.yporcelainsId).exec(function (err, yporcelains) {
          if (!yporcelains) {
            return res.status(404).send({
              message: 'No yporcelains with that identifier has been found'
            });
          }

          yporcelains.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          yporcelains.save(function (saveError) {
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
