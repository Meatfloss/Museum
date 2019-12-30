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
  Monkcap = mongoose.model('Monkcap');
mongoose.Promise = global.Promise;
/**
 * Create an monkcap
 */
exports.create = function (req, res) {
  var monkcap = new Monkcap(req.body);
  monkcap.user = req.user;

  monkcap.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(monkcap);
    }
  });
};

/**
 * Show the current monkcap
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var monkcap = req.monkcap ? req.monkcap.toJSON() : {};

  // Add a custom field to the Monkcap, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Monkcap model.
  monkcap.isCurrentUserOwner = !!(req.user && monkcap.user && monkcap.user._id.toString() === req.user._id.toString());

  res.json(monkcap);
};

/**
 * Update an monkcap
 */
exports.update = function (req, res) {
  var monkcap = req.monkcap;

  monkcap.name = req.body.name;
  monkcap.nameZH = req.body.nameZH;
  monkcap.description = req.body.description;
  monkcap.descriptionZH = req.body.descriptionZH;
  monkcap.topDiameter = req.body.topDiameter;
  monkcap.botDiameter = req.body.botDiameter;
  monkcap.length = req.body.length;
  monkcap.width = req.body.width;
  monkcap.height = req.body.height;
  monkcap.dynasty = req.body.dynasty;
  monkcap.category = req.body.category;

  monkcap.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(monkcap);
    }
  });
};

/**
 * Delete an monkcap
 */
exports.delete = function (req, res) {
  var monkcap = req.monkcap;

  monkcap.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(monkcap);
    }
  });
};

/**
 * List of Monkcaps
 */
// exports.list = function (req, res) {
//   Monkcap.find().sort('-created').exec(function (err, monkcaps) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       // var dynastes = _.compact(_.map(_.uniqBy(monkcaps, 'dynasty'), 'dynasty'));
//       // var categories = _.compact(_.map(_.uniqBy(monkcaps, 'category'), 'category'));
//       // res.json({ data: monkcaps, metaData: { dynastyList: dynastes, categoryList: categories } });
//       return monkcaps;
//     }
//   });
// };

// exports.filteredList = function (req, res) {
//   var filter = {};
//   if (req.params.dynasty && req.params.dynasty !== 'all') {
//     filter.dynasty = { $regex: new RegExp(req.params.dynasty, 'i') };
//   }
//   if (req.params.category && req.params.category !== 'all') {
//     filter.category = { $regex: new RegExp(req.params.category, 'i') };
//   }
//   Monkcap.find(filter).sort('-created').exec(function (err, monkcaps) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       // var dynastes = _.compact(_.map(_.uniqBy(monkcaps, 'dynasty'), 'dynasty'));
//       // var categories = _.compact(_.map(_.uniqBy(monkcaps, 'category'), 'category'));
//       // res.json({ data: monkcaps, metaData: { dynastyList: dynastes, categoryList: categories } });
//       return monkcaps;
//     }
//   });
// };

exports.list = function (req, res) {
  var result = {};
  Monkcap.find().sort('-created').exec()
    .then(function (monkcaps) {
      result.data = monkcaps;
      return Monkcap.find().distinct('dynasty').exec();
    })
    .then(function (dynastes) {
      result.metaData = { dynastyList: dynastes };
      return Monkcap.find().distinct('category').exec();
    })
    .then(function(categories) {
      result.metaData.categoryList = categories;
      res.json(result);
    })
    .catch(function (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
};

exports.filteredList = function (req, res) {
  var filter = {};
  var dyanstyFilter = {};
  if (req.params.dynasty && req.params.dynasty !== 'all') {
    // filter.dynasty = { $regex: new RegExp(req.params.dynasty, 'i') };
    // dyanstyFilter.dynasty = { $regex: new RegExp(req.params.dynasty, 'i') };
    filter.dynasty = req.params.dynasty;
    dyanstyFilter.dynasty = req.params.dynasty;
  }
  if (req.params.category && req.params.category !== 'all') {
    // filter.category = { $regex: new RegExp(req.params.category, 'i') };
    filter.category = req.params.category;
  }
  var result = {};
  Monkcap.find(filter).sort('-created').exec()
    .then(function (monkcaps) {
      result.data = monkcaps;
      return Monkcap.find().distinct('dynasty').exec();
    })
    .then(function (dynastes) {
      result.metaData = { dynastyList: dynastes };
      return Monkcap.find(dyanstyFilter).distinct('category').exec();
    })
    .then(function(categories) {
      result.metaData.categoryList = categories;
      res.json(result);
    })
    .catch(function (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
};

/**
 * Monkcap middleware
 */
exports.monkcapByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Monkcap is invalid'
    });
  }

  Monkcap.findById(id).populate('user', 'displayName').exec(function (err, monkcap) {
    if (err) {
      return next(err);
    } else if (!monkcap) {
      return res.status(404).send({
        message: 'No monkcap with that identifier has been found'
      });
    }
    req.monkcap = monkcap;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change monkcap image location.
  // var upload = multer(config.uploads.monkcapImageUpload).single('newPicture');
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

        Monkcap.findById(req.body.monkcapId).exec(function (err, monkcap) {
          if (!monkcap) {
            return res.status(404).send({
              message: 'No monkcap with that identifier has been found'
            });
          }

          monkcap.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          monkcap.save(function (saveError) {
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
