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
  Painting = mongoose.model('Painting');
/**
 * Create an painting
 */
exports.create = function (req, res) {
  var painting = new Painting(req.body);
  painting.user = req.user;

  painting.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(painting);
    }
  });
};

/**
 * Show the current painting
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var painting = req.painting ? req.painting.toJSON() : {};

  // Add a custom field to the Painting, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Painting model.
  painting.isCurrentUserOwner = !!(req.user && painting.user && painting.user._id.toString() === req.user._id.toString());

  res.json(painting);
};

/**
 * Update an painting
 */
exports.update = function (req, res) {
  var painting = req.painting;

  painting.name = req.body.name;
  painting.description = req.body.description;
  painting.author = req.body.author;
  painting.type = req.body.type;
  painting.width = req.body.width;
  painting.length = req.body.length;

  painting.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(painting);
    }
  });
};

/**
 * Delete an painting
 */
exports.delete = function (req, res) {
  var painting = req.painting;

  painting.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(painting);
    }
  });
};

/**
 * List of Paintings
 */
exports.list = function (req, res) {
  Painting.find().sort('-created').populate('user', 'displayName').populate('author', 'name').exec(function (err, paintings) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(paintings);
    }
  });
};

/**
 * Painting middleware
 */
exports.paintingByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Painting is invalid'
    });
  }

  Painting.findById(id).populate('user', 'displayName').populate('author', 'name').exec(function (err, painting) {
    if (err) {
      return next(err);
    } else if (!painting) {
      return res.status(404).send({
        message: 'No painting with that identifier has been found'
      });
    }
    req.painting = painting;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  //Todo: change painting image location.
  //var upload = multer(config.uploads.paintingImageUpload).single('newPicture');
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

        Painting.findById(req.body.paintingId).exec(function (err, painting) {
          if (!painting) {
            return res.status(404).send({
              message: 'No painting with that identifier has been found'
            });
          }

          painting.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          painting.save(function (saveError) {
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
