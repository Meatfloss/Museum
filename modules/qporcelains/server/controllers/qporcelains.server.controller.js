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
  Qporcelains = mongoose.model('Qporcelains');
mongoose.Promise = global.Promise;
/**
 * Create an qporcelains
 */
exports.create = function (req, res) {
  var qporcelains = new Qporcelains(req.body);
  qporcelains.user = req.user;

  qporcelains.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(qporcelains);
    }
  });
};

/**
 * Show the current qporcelains
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var qporcelains = req.qporcelains ? req.qporcelains.toJSON() : {};

  // Add a custom field to the Qporcelains, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Qporcelains model.
  qporcelains.isCurrentUserOwner = !!(req.user && qporcelains.user && qporcelains.user._id.toString() === req.user._id.toString());

  res.json(qporcelains);
};

/**
 * Update an qporcelains
 */
exports.update = function (req, res) {
  var qporcelains = req.qporcelains;

  qporcelains.name = req.body.name;
  qporcelains.nameZH = req.body.nameZH;
  qporcelains.description = req.body.description;
  qporcelains.descriptionZH = req.body.descriptionZH;
  qporcelains.topDiameter = req.body.topDiameter;
  qporcelains.botDiameter = req.body.botDiameter;
  qporcelains.length = req.body.length;
  qporcelains.width = req.body.width;
  qporcelains.height = req.body.height;
  qporcelains.dynasty = req.body.dynasty;
  qporcelains.category = req.body.category;

  qporcelains.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(qporcelains);
    }
  });
};

/**
 * Delete an qporcelains
 */
exports.delete = function (req, res) {
  var qporcelains = req.qporcelains;

  qporcelains.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(qporcelains);
    }
  });
};

/**
 * List of Qporcelains
 */
// exports.list = function (req, res) {
//   Qporcelains.find().sort('-created').exec(function (err, qporcelains) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       // var dynastes = _.compact(_.map(_.uniqBy(qporcelains, 'dynasty'), 'dynasty'));
//       // var categories = _.compact(_.map(_.uniqBy(qporcelains, 'category'), 'category'));
//       // res.json({ data: qporcelains, metaData: { dynastyList: dynastes, categoryList: categories } });
//       return qporcelains;
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
//   Qporcelains.find(filter).sort('-created').exec(function (err, qporcelains) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       // var dynastes = _.compact(_.map(_.uniqBy(qporcelains, 'dynasty'), 'dynasty'));
//       // var categories = _.compact(_.map(_.uniqBy(qporcelains, 'category'), 'category'));
//       // res.json({ data: qporcelains, metaData: { dynastyList: dynastes, categoryList: categories } });
//       return qporcelains;
//     }
//   });
// };

exports.list = function (req, res) {
  var result = {};
  Qporcelains.find().sort('-created').exec()
    .then(function (qporcelains) {
      result.data = qporcelains;
      return Qporcelains.find().distinct('dynasty').exec();
    })
    .then(function (dynastes) {
      result.metaData = { dynastyList: dynastes };
      return Qporcelains.find().distinct('category').exec();
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
  Qporcelains.find(filter).sort('-created').exec()
    .then(function (qporcelains) {
      result.data = qporcelains;
      return Qporcelains.find().distinct('dynasty').exec();
    })
    .then(function (dynastes) {
      result.metaData = { dynastyList: dynastes };
      return Qporcelains.find(dyanstyFilter).distinct('category').exec();
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
 * Qporcelains middleware
 */
exports.qporcelainsByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Qporcelains is invalid'
    });
  }

  Qporcelains.findById(id).populate('user', 'displayName').exec(function (err, qporcelains) {
    if (err) {
      return next(err);
    } else if (!qporcelains) {
      return res.status(404).send({
        message: 'No qporcelains with that identifier has been found'
      });
    }
    req.qporcelains = qporcelains;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change qporcelains image location.
  // var upload = multer(config.uploads.qporcelainsImageUpload).single('newPicture');
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

        Qporcelains.findById(req.body.qporcelainsId).exec(function (err, qporcelains) {
          if (!qporcelains) {
            return res.status(404).send({
              message: 'No qporcelains with that identifier has been found'
            });
          }

          qporcelains.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          qporcelains.save(function (saveError) {
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
