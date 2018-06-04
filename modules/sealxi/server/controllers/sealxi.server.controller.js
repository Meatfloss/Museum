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
  Sealxi = mongoose.model('Sealxi');
/**
 * Create an sealxi
 */
exports.create = function (req, res) {
  var sealxi = new Sealxi(req.body);
  sealxi.user = req.user;

  sealxi.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(sealxi);
    }
  });
};

/**
 * Show the current sealxi
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var sealxi = req.sealxi ? req.sealxi.toJSON() : {};

  // Add a custom field to the Sealxi, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Sealxi model.
  sealxi.isCurrentUserOwner = !!(req.user && sealxi.user && sealxi.user._id.toString() === req.user._id.toString());

  res.json(sealxi);
};

/**
 * Update an sealxi
 */
exports.update = function (req, res) {
  var sealxi = req.sealxi;

  sealxi.name = req.body.name;
  sealxi.nameZH = req.body.nameZH;
  sealxi.description = req.body.description;
  sealxi.descriptionZH = req.body.descriptionZH;
  sealxi.type = req.body.type;
  sealxi.weight = req.body.weight;  
  sealxi.width = req.body.width;
  sealxi.length = req.body.length;
  sealxi.height = req.body.height;
  sealxi.dynasty = req.body.dynasty;

  sealxi.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(sealxi);
    }
  });
};

/**
 * Delete an sealxi
 */
exports.delete = function (req, res) {
  var sealxi = req.sealxi;

  sealxi.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(sealxi);
    }
  });
};

/**
 * List of Sealxi
 */
exports.list = function (req, res) {
  Sealxi.find().sort('-created').populate('user', 'displayName').exec(function (err, sealxi) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(sealxi);
    }
  });
};

/**
 * Sealxi middleware
 */
exports.sealxiByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Sealxi is invalid'
    });
  }

  Sealxi.findById(id).populate('user', 'displayName').exec(function (err, sealxi) {
    if (err) {
      return next(err);
    } else if (!sealxi) {
      return res.status(404).send({
        message: 'No sealxi with that identifier has been found'
      });
    }
    req.sealxi = sealxi;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change sealxi image location.
  // var upload = multer(config.uploads.sealxiImageUpload).single('newPicture');
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

        Sealxi.findById(req.body.sealxiId).exec(function (err, sealxi) {
          if (!sealxi) {
            return res.status(404).send({
              message: 'No sealxi with that identifier has been found'
            });
          }

          sealxi.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          sealxi.save(function (saveError) {
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
