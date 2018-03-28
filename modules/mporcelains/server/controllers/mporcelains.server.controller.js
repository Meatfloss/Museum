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
  Mporcelains = mongoose.model('Mporcelains');
mongoose.Promise = global.Promise;
/**
 * Create an mporcelains
 */
exports.create = function (req, res) {
  var mporcelains = new Mporcelains(req.body);
  mporcelains.user = req.user;

  mporcelains.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(mporcelains);
    }
  });
};

/**
 * Show the current mporcelains
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var mporcelains = req.mporcelains ? req.mporcelains.toJSON() : {};

  // Add a custom field to the Mporcelains, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Mporcelains model.
  mporcelains.isCurrentUserOwner = !!(req.user && mporcelains.user && mporcelains.user._id.toString() === req.user._id.toString());

  res.json(mporcelains);
};

/**
 * Update an mporcelains
 */
exports.update = function (req, res) {
  var mporcelains = req.mporcelains;

  mporcelains.name = req.body.name;
  mporcelains.nameZH = req.body.nameZH;
  mporcelains.description = req.body.description;
  mporcelains.descriptionZH = req.body.descriptionZH;
  mporcelains.topDiameter = req.body.topDiameter;
  mporcelains.botDiameter = req.body.botDiameter;
  mporcelains.length = req.body.length;
  mporcelains.width = req.body.width;
  mporcelains.height = req.body.height;
  mporcelains.dynasty = req.body.dynasty;
  mporcelains.category = req.body.category;

  mporcelains.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(mporcelains);
    }
  });
};

/**
 * Delete an mporcelains
 */
exports.delete = function (req, res) {
  var mporcelains = req.mporcelains;

  mporcelains.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(mporcelains);
    }
  });
};

/**
 * List of Mporcelains
 */
// exports.list = function (req, res) {
//   Mporcelains.find().sort('-created').exec(function (err, mporcelains) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       // var dynastes = _.compact(_.map(_.uniqBy(mporcelains, 'dynasty'), 'dynasty'));
//       // var categories = _.compact(_.map(_.uniqBy(mporcelains, 'category'), 'category'));
//       // res.json({ data: mporcelains, metaData: { dynastyList: dynastes, categoryList: categories } });
//       return mporcelains;
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
//   Mporcelains.find(filter).sort('-created').exec(function (err, mporcelains) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       // var dynastes = _.compact(_.map(_.uniqBy(mporcelains, 'dynasty'), 'dynasty'));
//       // var categories = _.compact(_.map(_.uniqBy(mporcelains, 'category'), 'category'));
//       // res.json({ data: mporcelains, metaData: { dynastyList: dynastes, categoryList: categories } });
//       return mporcelains;
//     }
//   });
// };

exports.list = function (req, res) {
  var result = {};
  Mporcelains.find().sort('-created').exec()
    .then(function (mporcelains) {
      result.data = mporcelains;
      return Mporcelains.find().distinct('dynasty').exec();
    })
    .then(function (dynastes) {
      result.metaData = { dynastyList: dynastes };
      return Mporcelains.find().distinct('category').exec();
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
  Mporcelains.find(filter).sort('-created').exec()
    .then(function (mporcelains) {
      result.data = mporcelains;
      return Mporcelains.find().distinct('dynasty').exec();
    })
    .then(function (dynastes) {
      result.metaData = { dynastyList: dynastes };
      return Mporcelains.find(dyanstyFilter).distinct('category').exec();
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
 * Mporcelains middleware
 */
exports.mporcelainsByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Mporcelains is invalid'
    });
  }

  Mporcelains.findById(id).populate('user', 'displayName').exec(function (err, mporcelains) {
    if (err) {
      return next(err);
    } else if (!mporcelains) {
      return res.status(404).send({
        message: 'No mporcelains with that identifier has been found'
      });
    }
    req.mporcelains = mporcelains;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change mporcelains image location.
  // var upload = multer(config.uploads.mporcelainsImageUpload).single('newPicture');
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

        Mporcelains.findById(req.body.mporcelainsId).exec(function (err, mporcelains) {
          if (!mporcelains) {
            return res.status(404).send({
              message: 'No mporcelains with that identifier has been found'
            });
          }

          mporcelains.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          mporcelains.save(function (saveError) {
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
