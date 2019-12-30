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
  Currency = mongoose.model('Currency');
/**
 * Create an currency
 */
exports.create = function (req, res) {
  var currency = new Currency(req.body);
  currency.user = req.user;

  currency.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(currency);
    }
  });
};

/**
 * Show the current currency
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var currency = req.currency ? req.currency.toJSON() : {};

  // Add a custom field to the Currency, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Currency model.
  currency.isCurrentUserOwner = !!(req.user && currency.user && currency.user._id.toString() === req.user._id.toString());

  res.json(currency);
};

/**
 * Update an currency
 */
exports.update = function (req, res) {
  var currency = req.currency;

  currency.name = req.body.name;
  currency.nameZH = req.body.nameZH;
  currency.description = req.body.description;
  currency.descriptionZH = req.body.descriptionZH;
  currency.type = req.body.type;
  currency.weight = req.body.weight;
  currency.width = req.body.width;
  currency.length = req.body.length;
  currency.height = req.body.height;
  currency.dynasty = req.body.dynasty;

  currency.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(currency);
    }
  });
};

/**
 * Delete an currency
 */
exports.delete = function (req, res) {
  var currency = req.currency;

  currency.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(currency);
    }
  });
};

/**
 * List of Currency
 */
exports.list = function (req, res) {
  Currency.find().sort('-created').populate('user', 'displayName').exec(function (err, currency) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(currency);
    }
  });
};

/**
 * Currency middleware
 */
exports.currencyByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Currency is invalid'
    });
  }

  Currency.findById(id).populate('user', 'displayName').exec(function (err, currency) {
    if (err) {
      return next(err);
    } else if (!currency) {
      return res.status(404).send({
        message: 'No currency with that identifier has been found'
      });
    }
    req.currency = currency;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change currency image location.
  // var upload = multer(config.uploads.currencyImageUpload).single('newPicture');
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

        Currency.findById(req.body.currencyId).exec(function (err, currency) {
          if (!currency) {
            return res.status(404).send({
              message: 'No currency with that identifier has been found'
            });
          }

          currency.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          currency.save(function (saveError) {
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
