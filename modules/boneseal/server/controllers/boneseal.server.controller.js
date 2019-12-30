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
  Boneseal = mongoose.model('Boneseal');
/**
 * Create an boneseal
 */
exports.create = function (req, res) {
  var boneseal = new Boneseal(req.body);
  boneseal.user = req.user;

  boneseal.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(boneseal);
    }
  });
};

/**
 * Show the current boneseal
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var boneseal = req.boneseal ? req.boneseal.toJSON() : {};

  // Add a custom field to the Boneseal, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Boneseal model.
  boneseal.isCurrentUserOwner = !!(req.user && boneseal.user && boneseal.user._id.toString() === req.user._id.toString());

  res.json(boneseal);
};

/**
 * Update an boneseal
 */
exports.update = function (req, res) {
  var boneseal = req.boneseal;

  boneseal.name = req.body.name;
  boneseal.nameZH = req.body.nameZH;
  boneseal.description = req.body.description;
  boneseal.descriptionZH = req.body.descriptionZH;
  boneseal.type = req.body.type;
  boneseal.weight = req.body.weight;
  boneseal.width = req.body.width;
  boneseal.length = req.body.length;
  boneseal.height = req.body.height;
  boneseal.dynasty = req.body.dynasty;

  boneseal.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(boneseal);
    }
  });
};

/**
 * Delete an boneseal
 */
exports.delete = function (req, res) {
  var boneseal = req.boneseal;

  boneseal.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(boneseal);
    }
  });
};

/**
 * List of Boneseal
 */
exports.list = function (req, res) {
  Boneseal.find().sort('-created').populate('user', 'displayName').exec(function (err, boneseal) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(boneseal);
    }
  });
};

/**
 * Boneseal middleware
 */
exports.bonesealByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Boneseal is invalid'
    });
  }

  Boneseal.findById(id).populate('user', 'displayName').exec(function (err, boneseal) {
    if (err) {
      return next(err);
    } else if (!boneseal) {
      return res.status(404).send({
        message: 'No boneseal with that identifier has been found'
      });
    }
    req.boneseal = boneseal;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change boneseal image location.
  // var upload = multer(config.uploads.bonesealImageUpload).single('newPicture');
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

        Boneseal.findById(req.body.bonesealId).exec(function (err, boneseal) {
          if (!boneseal) {
            return res.status(404).send({
              message: 'No boneseal with that identifier has been found'
            });
          }

          boneseal.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          boneseal.save(function (saveError) {
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
