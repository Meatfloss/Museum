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
  Tianhuang = mongoose.model('Tianhuang');
/**
 * Create an tianhuang
 */
exports.create = function (req, res) {
  var tianhuang = new Tianhuang(req.body);
  tianhuang.user = req.user;

  tianhuang.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(tianhuang);
    }
  });
};

/**
 * Show the current tianhuang
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var tianhuang = req.tianhuang ? req.tianhuang.toJSON() : {};

  // Add a custom field to the Tianhuang, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Tianhuang model.
  tianhuang.isCurrentUserOwner = !!(req.user && tianhuang.user && tianhuang.user._id.toString() === req.user._id.toString());

  res.json(tianhuang);
};

/**
 * Update an tianhuang
 */
exports.update = function (req, res) {
  var tianhuang = req.tianhuang;

  tianhuang.name = req.body.name;
  tianhuang.nameZH = req.body.nameZH;
  tianhuang.description = req.body.description;
  tianhuang.descriptionZH = req.body.descriptionZH;
  tianhuang.type = req.body.type;
  tianhuang.weight = req.body.weight;
  tianhuang.width = req.body.width;
  tianhuang.length = req.body.length;
  tianhuang.height = req.body.height;
  tianhuang.dynasty = req.body.dynasty;

  tianhuang.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(tianhuang);
    }
  });
};

/**
 * Delete an tianhuang
 */
exports.delete = function (req, res) {
  var tianhuang = req.tianhuang;

  tianhuang.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(tianhuang);
    }
  });
};

/**
 * List of Tianhuang
 */
exports.list = function (req, res) {
  Tianhuang.find().sort('-created').populate('user', 'displayName').exec(function (err, tianhuang) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(tianhuang);
    }
  });
};

/**
 * Tianhuang middleware
 */
exports.tianhuangByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Tianhuang is invalid'
    });
  }

  Tianhuang.findById(id).populate('user', 'displayName').exec(function (err, tianhuang) {
    if (err) {
      return next(err);
    } else if (!tianhuang) {
      return res.status(404).send({
        message: 'No tianhuang with that identifier has been found'
      });
    }
    req.tianhuang = tianhuang;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change tianhuang image location.
  // var upload = multer(config.uploads.tianhuangImageUpload).single('newPicture');
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

        Tianhuang.findById(req.body.tianhuangId).exec(function (err, tianhuang) {
          if (!tianhuang) {
            return res.status(404).send({
              message: 'No tianhuang with that identifier has been found'
            });
          }

          tianhuang.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          tianhuang.save(function (saveError) {
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
