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
  Ceramic = mongoose.model('Ceramic');
// mongoose.Promise = global.Promise;
/**
 * Create an ceramic
 */
exports.create = function (req, res) {
  var ceramic = new Ceramic(req.body);
  ceramic.user = req.user;

  ceramic.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(ceramic);
    }
  });
};

/**
 * Show the current ceramic
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var ceramic = req.ceramic ? req.ceramic.toJSON() : {};

  // Add a custom field to the Ceramic, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Ceramic model.
  ceramic.isCurrentUserOwner = !!(req.user && ceramic.user && ceramic.user._id.toString() === req.user._id.toString());

  res.json(ceramic);
};

/**
 * Update an ceramic
 */
exports.update = function (req, res) {
  var ceramic = req.ceramic;

  ceramic.name = req.body.name;
  ceramic.nameZH = req.body.nameZH;
  ceramic.description = req.body.description;
  ceramic.descriptionZH = req.body.descriptionZH;
  ceramic.topDiameter = req.body.topDiameter;
  ceramic.botDiameter = req.body.botDiameter;
  ceramic.length = req.body.length;
  ceramic.width = req.body.width;
  ceramic.height = req.body.height;
  ceramic.dynasty = req.body.dynasty;
  ceramic.category = req.body.category;

  ceramic.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(ceramic);
    }
  });
};

/**
 * Delete an ceramic
 */
exports.delete = function (req, res) {
  var ceramic = req.ceramic;

  ceramic.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(ceramic);
    }
  });
};

/**
 * List of Ceramics
 */
exports.list = function (req, res) {
  Ceramic.find().sort('-created').exec(function (err, ceramics) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      // var dynastes = _.compact(_.map(_.uniqBy(ceramics, 'dynasty'), 'dynasty'));
      // var categories = _.compact(_.map(_.uniqBy(ceramics, 'category'), 'category'));
      // res.json({ data: ceramics, metaData: { dynastyList: dynastes, categoryList: categories } });
      return ceramics;
    }
  });
};

exports.filteredList = function (req, res) {
  var filter = {};
  if (req.params.dynasty && req.params.dynasty !== 'all') {
    filter.dynasty = { $regex: new RegExp(req.params.dynasty, 'i') };
  }
  if (req.params.category && req.params.category !== 'all') {
    filter.category = { $regex: new RegExp(req.params.category, 'i') };
  }
  Ceramic.find(filter).sort('-created').exec(function (err, ceramics) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      // var dynastes = _.compact(_.map(_.uniqBy(ceramics, 'dynasty'), 'dynasty'));
      // var categories = _.compact(_.map(_.uniqBy(ceramics, 'category'), 'category'));
      // res.json({ data: ceramics, metaData: { dynastyList: dynastes, categoryList: categories } });
      return ceramics;
    }
  });
};

// exports.list = function (req, res) {
//   var result = {};
//   Ceramic.find().sort('-created').exec()
//     .then(function (ceramics) {
//       result.data = ceramics;
//       return Ceramic.find().distinct('dynasty').exec();
//     })
//     .then(function (dynastes) {
//       result.metaData = { dynastyList: dynastes };
//       return Ceramic.find().distinct('category').exec();
//     })
//     .then(function(categories) {
//       result.metaData.categoryList = categories;
//       return result;
//     })
//     .catch(function (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     });
// };

// exports.filteredList = function (req, res) {
//   var filter = {};
//   if (req.params.dynasty && req.params.dynasty !== 'all') {
//     filter.dynasty = { $regex: new RegExp(req.params.dynasty, 'i') };
//   }
//   if (req.params.category && req.params.category !== 'all') {
//     filter.category = { $regex: new RegExp(req.params.category, 'i') };
//   }
//   var result = {};
//   Ceramic.find(filter).sort('-created').exec()
//     .then(function (ceramics) {
//       result.data = ceramics;
//       return Ceramic.find().distinct('dynasty').exec();
//     })
//     .then(function (dynastes) {
//       result.metaData = { dynastyList: dynastes };
//       return Ceramic.find().distinct('category').exec();
//     })
//     .then(function(categories) {
//       result.metaData.categoryList = categories;
//       return result;
//     })
//     .catch(function (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     });
// };


/**
 * Ceramic middleware
 */
exports.ceramicByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Ceramic is invalid'
    });
  }

  Ceramic.findById(id).populate('user', 'displayName').exec(function (err, ceramic) {
    if (err) {
      return next(err);
    } else if (!ceramic) {
      return res.status(404).send({
        message: 'No ceramic with that identifier has been found'
      });
    }
    req.ceramic = ceramic;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change ceramic image location.
  // var upload = multer(config.uploads.ceramicImageUpload).single('newPicture');
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

        Ceramic.findById(req.body.ceramicId).exec(function (err, ceramic) {
          if (!ceramic) {
            return res.status(404).send({
              message: 'No ceramic with that identifier has been found'
            });
          }

          ceramic.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          ceramic.save(function (saveError) {
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
