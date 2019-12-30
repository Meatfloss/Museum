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
  Bone = mongoose.model('Bone');
/**
 * Create an bone
 */
exports.create = function (req, res) {
  var bone = new Bone(req.body);
  bone.user = req.user;

  bone.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bone);
    }
  });
};

/**
 * Show the current bone
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var bone = req.bone ? req.bone.toJSON() : {};

  // Add a custom field to the Bone, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Bone model.
  bone.isCurrentUserOwner = !!(req.user && bone.user && bone.user._id.toString() === req.user._id.toString());

  res.json(bone);
};

/**
 * Update an bone
 */
exports.update = function (req, res) {
  var bone = req.bone;

  bone.name = req.body.name;
  bone.nameZH = req.body.nameZH;
  bone.description = req.body.description;
  bone.descriptionZH = req.body.descriptionZH;
  bone.type = req.body.type;
  bone.weight = req.body.weight;
  bone.width = req.body.width;
  bone.length = req.body.length;
  bone.height = req.body.height;
  bone.dynasty = req.body.dynasty;

  bone.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bone);
    }
  });
};

/**
 * Delete an bone
 */
exports.delete = function (req, res) {
  var bone = req.bone;

  bone.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bone);
    }
  });
};

/**
 * List of Bone
 */
exports.list = function (req, res) {
  Bone.find().sort('-created').populate('user', 'displayName').exec(function (err, bone) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bone);
    }
  });
};

/**
 * Bone middleware
 */
exports.boneByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Bone is invalid'
    });
  }

  Bone.findById(id).populate('user', 'displayName').exec(function (err, bone) {
    if (err) {
      return next(err);
    } else if (!bone) {
      return res.status(404).send({
        message: 'No bone with that identifier has been found'
      });
    }
    req.bone = bone;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change bone image location.
  // var upload = multer(config.uploads.boneImageUpload).single('newPicture');
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

        Bone.findById(req.body.boneId).exec(function (err, bone) {
          if (!bone) {
            return res.status(404).send({
              message: 'No bone with that identifier has been found'
            });
          }

          bone.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          bone.save(function (saveError) {
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
