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
  Bronze = mongoose.model('Bronze');
/**
 * Create an bronze
 */
exports.create = function (req, res) {
  var bronze = new Bronze(req.body);
  bronze.user = req.user;

  bronze.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bronze);
    }
  });
};

/**
 * Show the current bronze
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var bronze = req.bronze ? req.bronze.toJSON() : {};

  // Add a custom field to the Bronze, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Bronze model.
  bronze.isCurrentUserOwner = !!(req.user && bronze.user && bronze.user._id.toString() === req.user._id.toString());

  res.json(bronze);
};

/**
 * Update an bronze
 */
exports.update = function (req, res) {
  var bronze = req.bronze;

  bronze.name = req.body.name;
  bronze.nameZH = req.body.nameZH;
  bronze.description = req.body.description;
  bronze.descriptionZH = req.body.descriptionZH;
  bronze.type = req.body.type;
  bronze.width = req.body.width;
  bronze.length = req.body.length;
  bronze.height = req.body.height;
  bronze.dynasty = req.body.dynasty;

  bronze.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bronze);
    }
  });
};

/**
 * Delete an bronze
 */
exports.delete = function (req, res) {
  var bronze = req.bronze;

  bronze.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bronze);
    }
  });
};

/**
 * List of Bronzes
 */
exports.list = function (req, res) {
  Bronze.find().sort('-created').populate('user', 'displayName').exec(function (err, bronzes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bronzes);
    }
  });
};

/**
 * Bronze middleware
 */
exports.bronzeByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Bronze is invalid'
    });
  }

  Bronze.findById(id).populate('user', 'displayName').exec(function (err, bronze) {
    if (err) {
      return next(err);
    } else if (!bronze) {
      return res.status(404).send({
        message: 'No bronze with that identifier has been found'
      });
    }
    req.bronze = bronze;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change bronze image location.
  // var upload = multer(config.uploads.bronzeImageUpload).single('newPicture');
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

        Bronze.findById(req.body.bronzeId).exec(function (err, bronze) {
          if (!bronze) {
            return res.status(404).send({
              message: 'No bronze with that identifier has been found'
            });
          }

          bronze.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          bronze.save(function (saveError) {
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
