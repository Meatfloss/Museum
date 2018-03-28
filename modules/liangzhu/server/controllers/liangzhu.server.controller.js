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
  Liangzhu = mongoose.model('Liangzhu');
/**
 * Create an liangzhu
 */
exports.create = function (req, res) {
  var liangzhu = new Liangzhu(req.body);
  liangzhu.user = req.user;

  liangzhu.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(liangzhu);
    }
  });
};

/**
 * Show the current liangzhu
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var liangzhu = req.liangzhu ? req.liangzhu.toJSON() : {};

  // Add a custom field to the Liangzhu, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Liangzhu model.
  liangzhu.isCurrentUserOwner = !!(req.user && liangzhu.user && liangzhu.user._id.toString() === req.user._id.toString());

  res.json(liangzhu);
};

/**
 * Update an liangzhu
 */
exports.update = function (req, res) {
  var liangzhu = req.liangzhu;

  liangzhu.name = req.body.name;
  liangzhu.nameZH = req.body.nameZH;
  liangzhu.description = req.body.description;
  liangzhu.descriptionZH = req.body.descriptionZH;
  liangzhu.type = req.body.type;
  liangzhu.weight = req.body.weight;  
  liangzhu.width = req.body.width;
  liangzhu.length = req.body.length;
  liangzhu.height = req.body.height;
  liangzhu.dynasty = req.body.dynasty;

  liangzhu.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(liangzhu);
    }
  });
};

/**
 * Delete an liangzhu
 */
exports.delete = function (req, res) {
  var liangzhu = req.liangzhu;

  liangzhu.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(liangzhu);
    }
  });
};

/**
 * List of Liangzhu
 */
exports.list = function (req, res) {
  Liangzhu.find().sort('-created').populate('user', 'displayName').exec(function (err, liangzhu) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(liangzhu);
    }
  });
};

/**
 * Liangzhu middleware
 */
exports.liangzhuByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Liangzhu is invalid'
    });
  }

  Liangzhu.findById(id).populate('user', 'displayName').exec(function (err, liangzhu) {
    if (err) {
      return next(err);
    } else if (!liangzhu) {
      return res.status(404).send({
        message: 'No liangzhu with that identifier has been found'
      });
    }
    req.liangzhu = liangzhu;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change liangzhu image location.
  // var upload = multer(config.uploads.liangzhuImageUpload).single('newPicture');
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

        Liangzhu.findById(req.body.liangzhuId).exec(function (err, liangzhu) {
          if (!liangzhu) {
            return res.status(404).send({
              message: 'No liangzhu with that identifier has been found'
            });
          }

          liangzhu.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          liangzhu.save(function (saveError) {
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
