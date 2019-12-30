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
  Guibi = mongoose.model('Guibi');
/**
 * Create an guibi
 */
exports.create = function (req, res) {
  var guibi = new Guibi(req.body);
  guibi.user = req.user;

  guibi.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(guibi);
    }
  });
};

/**
 * Show the current guibi
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var guibi = req.guibi ? req.guibi.toJSON() : {};

  // Add a custom field to the Guibi, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Guibi model.
  guibi.isCurrentUserOwner = !!(req.user && guibi.user && guibi.user._id.toString() === req.user._id.toString());

  res.json(guibi);
};

/**
 * Update an guibi
 */
exports.update = function (req, res) {
  var guibi = req.guibi;

  guibi.name = req.body.name;
  guibi.nameZH = req.body.nameZH;
  guibi.description = req.body.description;
  guibi.descriptionZH = req.body.descriptionZH;
  guibi.type = req.body.type;
  guibi.weight = req.body.weight;
  guibi.width = req.body.width;
  guibi.length = req.body.length;
  guibi.height = req.body.height;
  guibi.dynasty = req.body.dynasty;

  guibi.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(guibi);
    }
  });
};

/**
 * Delete an guibi
 */
exports.delete = function (req, res) {
  var guibi = req.guibi;

  guibi.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(guibi);
    }
  });
};

/**
 * List of Guibi
 */
exports.list = function (req, res) {
  Guibi.find().sort('-created').populate('user', 'displayName').exec(function (err, guibi) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(guibi);
    }
  });
};

/**
 * Guibi middleware
 */
exports.guibiByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Guibi is invalid'
    });
  }

  Guibi.findById(id).populate('user', 'displayName').exec(function (err, guibi) {
    if (err) {
      return next(err);
    } else if (!guibi) {
      return res.status(404).send({
        message: 'No guibi with that identifier has been found'
      });
    }
    req.guibi = guibi;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change guibi image location.
  // var upload = multer(config.uploads.guibiImageUpload).single('newPicture');
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

        Guibi.findById(req.body.guibiId).exec(function (err, guibi) {
          if (!guibi) {
            return res.status(404).send({
              message: 'No guibi with that identifier has been found'
            });
          }

          guibi.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          guibi.save(function (saveError) {
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
