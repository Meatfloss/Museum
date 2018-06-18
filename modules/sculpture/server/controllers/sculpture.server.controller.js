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
  Sculpture = mongoose.model('Sculpture');
mongoose.Promise = global.Promise;
/**
 * Create an sculpture
 */
exports.create = function (req, res) {
  var sculpture = new Sculpture(req.body);
  sculpture.user = req.user;

  sculpture.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(sculpture);
    }
  });
};

/**
 * Show the current sculpture
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var sculpture = req.sculpture ? req.sculpture.toJSON() : {};

  // Add a custom field to the Sculpture, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Sculpture model.
  sculpture.isCurrentUserOwner = !!(req.user && sculpture.user && sculpture.user._id.toString() === req.user._id.toString());

  res.json(sculpture);
};

/**
 * Update an sculpture
 */
exports.update = function (req, res) {
  var sculpture = req.sculpture;

  sculpture.name = req.body.name;
  sculpture.nameZH = req.body.nameZH;
  sculpture.description = req.body.description;
  sculpture.descriptionZH = req.body.descriptionZH;
  sculpture.topDiameter = req.body.topDiameter;
  sculpture.botDiameter = req.body.botDiameter;
  sculpture.length = req.body.length;
  sculpture.width = req.body.width;
  sculpture.height = req.body.height;
  sculpture.dynasty = req.body.dynasty;
  sculpture.category = req.body.category;

  sculpture.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(sculpture);
    }
  });
};

/**
 * Delete an sculpture
 */
exports.delete = function (req, res) {
  var sculpture = req.sculpture;

  sculpture.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(sculpture);
    }
  });
};

/**
 * List of Sculpture
 */
// exports.list = function (req, res) {
//   Sculpture.find().sort('-created').exec(function (err, sculpture) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       // var dynastes = _.compact(_.map(_.uniqBy(sculpture, 'dynasty'), 'dynasty'));
//       // var categories = _.compact(_.map(_.uniqBy(sculpture, 'category'), 'category'));
//       // res.json({ data: sculpture, metaData: { dynastyList: dynastes, categoryList: categories } });
//       return sculpture;
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
//   Sculpture.find(filter).sort('-created').exec(function (err, sculpture) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       // var dynastes = _.compact(_.map(_.uniqBy(sculpture, 'dynasty'), 'dynasty'));
//       // var categories = _.compact(_.map(_.uniqBy(sculpture, 'category'), 'category'));
//       // res.json({ data: sculpture, metaData: { dynastyList: dynastes, categoryList: categories } });
//       return sculpture;
//     }
//   });
// };

exports.list = function (req, res) {
  var result = {};
  Sculpture.find().sort('-created').exec()
    .then(function (sculpture) {
      result.data = sculpture;
      return Sculpture.find().distinct('dynasty').exec();
    })
    .then(function (dynastes) {
      result.metaData = { dynastyList: dynastes };
      return Sculpture.find().distinct('category').exec();
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
  Sculpture.find(filter).sort('-created').exec()
    .then(function (sculpture) {
      result.data = sculpture;
      return Sculpture.find().distinct('dynasty').exec();
    })
    .then(function (dynastes) {
      result.metaData = { dynastyList: dynastes };
      return Sculpture.find(dyanstyFilter).distinct('category').exec();
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
 * Sculpture middleware
 */
exports.sculptureByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Sculpture is invalid'
    });
  }

  Sculpture.findById(id).populate('user', 'displayName').exec(function (err, sculpture) {
    if (err) {
      return next(err);
    } else if (!sculpture) {
      return res.status(404).send({
        message: 'No sculpture with that identifier has been found'
      });
    }
    req.sculpture = sculpture;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change sculpture image location.
  // var upload = multer(config.uploads.sculptureImageUpload).single('newPicture');
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

        Sculpture.findById(req.body.sculptureId).exec(function (err, sculpture) {
          if (!sculpture) {
            return res.status(404).send({
              message: 'No sculpture with that identifier has been found'
            });
          }

          sculpture.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          sculpture.save(function (saveError) {
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
