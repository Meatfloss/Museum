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
  Cloisonne = mongoose.model('Cloisonne');
/**
 * Create an cloisonne
 */
exports.create = function (req, res) {
  var cloisonne = new Cloisonne(req.body);
  cloisonne.user = req.user;

  cloisonne.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cloisonne);
    }
  });
};

/**
 * Show the current cloisonne
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var cloisonne = req.cloisonne ? req.cloisonne.toJSON() : {};

  // Add a custom field to the Cloisonne, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Cloisonne model.
  cloisonne.isCurrentUserOwner = !!(req.user && cloisonne.user && cloisonne.user._id.toString() === req.user._id.toString());

  res.json(cloisonne);
};

/**
 * Update an cloisonne
 */
exports.update = function (req, res) {
  var cloisonne = req.cloisonne;

  cloisonne.name = req.body.name;
  cloisonne.nameZH = req.body.nameZH;
  cloisonne.description = req.body.description;
  cloisonne.descriptionZH = req.body.descriptionZH;
  cloisonne.type = req.body.type;
  cloisonne.weight = req.body.weight;
  cloisonne.width = req.body.width;
  cloisonne.length = req.body.length;
  cloisonne.height = req.body.height;
  cloisonne.dynasty = req.body.dynasty;

  cloisonne.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cloisonne);
    }
  });
};

/**
 * Delete an cloisonne
 */
exports.delete = function (req, res) {
  var cloisonne = req.cloisonne;

  cloisonne.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cloisonne);
    }
  });
};

/**
 * List of Cloisonne
 */
exports.list = function (req, res) {
  Cloisonne.find().sort('-created').populate('user', 'displayName').exec(function (err, cloisonne) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cloisonne);
    }
  });
};

/**
 * Cloisonne middleware
 */
exports.cloisonneByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Cloisonne is invalid'
    });
  }

  Cloisonne.findById(id).populate('user', 'displayName').exec(function (err, cloisonne) {
    if (err) {
      return next(err);
    } else if (!cloisonne) {
      return res.status(404).send({
        message: 'No cloisonne with that identifier has been found'
      });
    }
    req.cloisonne = cloisonne;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change cloisonne image location.
  // var upload = multer(config.uploads.cloisonneImageUpload).single('newPicture');
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

        Cloisonne.findById(req.body.cloisonneId).exec(function (err, cloisonne) {
          if (!cloisonne) {
            return res.status(404).send({
              message: 'No cloisonne with that identifier has been found'
            });
          }

          cloisonne.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          cloisonne.save(function (saveError) {
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
