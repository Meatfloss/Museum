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
  Sword = mongoose.model('Sword');
/**
 * Create an sword
 */
exports.create = function (req, res) {
  var sword = new Sword(req.body);
  sword.user = req.user;

  sword.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(sword);
    }
  });
};

/**
 * Show the current sword
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var sword = req.sword ? req.sword.toJSON() : {};

  // Add a custom field to the Sword, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Sword model.
  sword.isCurrentUserOwner = !!(req.user && sword.user && sword.user._id.toString() === req.user._id.toString());

  res.json(sword);
};

/**
 * Update an sword
 */
exports.update = function (req, res) {
  var sword = req.sword;

  sword.name = req.body.name;
  sword.nameZH = req.body.nameZH;
  sword.description = req.body.description;
  sword.descriptionZH = req.body.descriptionZH;
  sword.type = req.body.type;
  sword.weight = req.body.weight;
  sword.width = req.body.width;
  sword.length = req.body.length;
  sword.height = req.body.height;
  sword.dynasty = req.body.dynasty;

  sword.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(sword);
    }
  });
};

/**
 * Delete an sword
 */
exports.delete = function (req, res) {
  var sword = req.sword;

  sword.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(sword);
    }
  });
};

/**
 * List of Sword
 */
exports.list = function (req, res) {
  Sword.find().sort('-created').populate('user', 'displayName').exec(function (err, sword) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(sword);
    }
  });
};

/**
 * Sword middleware
 */
exports.swordByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Sword is invalid'
    });
  }

  Sword.findById(id).populate('user', 'displayName').exec(function (err, sword) {
    if (err) {
      return next(err);
    } else if (!sword) {
      return res.status(404).send({
        message: 'No sword with that identifier has been found'
      });
    }
    req.sword = sword;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change sword image location.
  // var upload = multer(config.uploads.swordImageUpload).single('newPicture');
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

        Sword.findById(req.body.swordId).exec(function (err, sword) {
          if (!sword) {
            return res.status(404).send({
              message: 'No sword with that identifier has been found'
            });
          }

          sword.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          sword.save(function (saveError) {
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
