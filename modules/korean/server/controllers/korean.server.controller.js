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
  Korean = mongoose.model('Korean');
mongoose.Promise = global.Promise;
/**
 * Create an korean
 */
exports.create = function (req, res) {
  var korean = new Korean(req.body);
  korean.user = req.user;

  korean.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(korean);
    }
  });
};

/**
 * Show the current korean
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var korean = req.korean ? req.korean.toJSON() : {};

  // Add a custom field to the Korean, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Korean model.
  korean.isCurrentUserOwner = !!(req.user && korean.user && korean.user._id.toString() === req.user._id.toString());

  res.json(korean);
};

/**
 * Update an korean
 */
exports.update = function (req, res) {
  var korean = req.korean;

  korean.name = req.body.name;
  korean.nameZH = req.body.nameZH;
  korean.description = req.body.description;
  korean.descriptionZH = req.body.descriptionZH;
  korean.topDiameter = req.body.topDiameter;
  korean.botDiameter = req.body.botDiameter;
  korean.length = req.body.length;
  korean.width = req.body.width;
  korean.height = req.body.height;
  korean.dynasty = req.body.dynasty;
  korean.category = req.body.category;

  korean.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(korean);
    }
  });
};

/**
 * Delete an korean
 */
exports.delete = function (req, res) {
  var korean = req.korean;

  korean.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(korean);
    }
  });
};

/**
 * List of Korean
 */
// exports.list = function (req, res) {
//   Korean.find().sort('-created').exec(function (err, korean) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       // var dynastes = _.compact(_.map(_.uniqBy(korean, 'dynasty'), 'dynasty'));
//       // var categories = _.compact(_.map(_.uniqBy(korean, 'category'), 'category'));
//       // res.json({ data: korean, metaData: { dynastyList: dynastes, categoryList: categories } });
//       return korean;
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
//   Korean.find(filter).sort('-created').exec(function (err, korean) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       // var dynastes = _.compact(_.map(_.uniqBy(korean, 'dynasty'), 'dynasty'));
//       // var categories = _.compact(_.map(_.uniqBy(korean, 'category'), 'category'));
//       // res.json({ data: korean, metaData: { dynastyList: dynastes, categoryList: categories } });
//       return korean;
//     }
//   });
// };

exports.list = function (req, res) {
  var result = {};
  Korean.find().sort('-created').exec()
    .then(function (korean) {
      result.data = korean;
      return Korean.find().distinct('dynasty').exec();
    })
    .then(function (dynastes) {
      result.metaData = { dynastyList: dynastes };
      return Korean.find().distinct('category').exec();
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
  Korean.find(filter).sort('-created').exec()
    .then(function (korean) {
      result.data = korean;
      return Korean.find().distinct('dynasty').exec();
    })
    .then(function (dynastes) {
      result.metaData = { dynastyList: dynastes };
      return Korean.find(dyanstyFilter).distinct('category').exec();
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
 * Korean middleware
 */
exports.koreanByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Korean is invalid'
    });
  }

  Korean.findById(id).populate('user', 'displayName').exec(function (err, korean) {
    if (err) {
      return next(err);
    } else if (!korean) {
      return res.status(404).send({
        message: 'No korean with that identifier has been found'
      });
    }
    req.korean = korean;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change korean image location.
  // var upload = multer(config.uploads.koreanImageUpload).single('newPicture');
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

        Korean.findById(req.body.koreanId).exec(function (err, korean) {
          if (!korean) {
            return res.status(404).send({
              message: 'No korean with that identifier has been found'
            });
          }

          korean.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          korean.save(function (saveError) {
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
