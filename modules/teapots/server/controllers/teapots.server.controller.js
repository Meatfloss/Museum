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
  Teapot = mongoose.model('Teapot');
/**
 * Create an teapot
 */
exports.create = function (req, res) {
  var teapot = new Teapot(req.body);
  teapot.user = req.user;

  teapot.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(teapot);
    }
  });
};

/**
 * Show the current teapot
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var teapot = req.teapot ? req.teapot.toJSON() : {};

  // Add a custom field to the Teapot, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Teapot model.
  teapot.isCurrentUserOwner = !!(req.user && teapot.user && teapot.user._id.toString() === req.user._id.toString());

  res.json(teapot);
};

/**
 * Update an teapot
 */
exports.update = function (req, res) {
  var teapot = req.teapot;

  teapot.name = req.body.name;
  teapot.nameZH = req.body.nameZH;
  teapot.description = req.body.description;
  teapot.descriptionZH = req.body.descriptionZH;
  teapot.author = req.body.author;
  teapot.authorZH = req.body.authorZH;
  teapot.mark = req.body.mark;
  teapot.markZH = req.body.markZH;
  teapot.height = req.body.height;
  teapot.dynasty = req.body.dynasty;
  teapot.reignTitle = req.body.reignTitle;

  teapot.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(teapot);
    }
  });
};

/**
 * Delete an teapot
 */
exports.delete = function (req, res) {
  var teapot = req.teapot;

  teapot.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(teapot);
    }
  });
};

/**
 * List of Teapots
 */
exports.list = function (req, res) {
  Teapot.find().sort('-created').populate('user', 'displayName').exec(function (err, teapots) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(teapots);
    }
  });
};

/**
 * Teapot middleware
 */
exports.teapotByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Teapot is invalid'
    });
  }

  Teapot.findById(id).populate('user', 'displayName').exec(function (err, teapot) {
    if (err) {
      return next(err);
    } else if (!teapot) {
      return res.status(404).send({
        message: 'No teapot with that identifier has been found'
      });
    }
    req.teapot = teapot;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change teapot image location.
  // var upload = multer(config.uploads.teapotImageUpload).single('newPicture');
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

        Teapot.findById(req.body.teapotId).exec(function (err, teapot) {
          if (!teapot) {
            return res.status(404).send({
              message: 'No teapot with that identifier has been found'
            });
          }

          teapot.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          teapot.save(function (saveError) {
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
