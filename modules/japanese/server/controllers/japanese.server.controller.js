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
  Japanese = mongoose.model('Japanese');
mongoose.Promise = global.Promise;
/**
 * Create an japanese
 */
exports.create = function (req, res) {
  var japanese = new Japanese(req.body);
  japanese.user = req.user;

  japanese.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(japanese);
    }
  });
};

/**
 * Show the current japanese
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var japanese = req.japanese ? req.japanese.toJSON() : {};

  // Add a custom field to the Japanese, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Japanese model.
  japanese.isCurrentUserOwner = !!(req.user && japanese.user && japanese.user._id.toString() === req.user._id.toString());

  res.json(japanese);
};

/**
 * Update an japanese
 */
exports.update = function (req, res) {
  var japanese = req.japanese;

  japanese.name = req.body.name;
  japanese.nameZH = req.body.nameZH;
  japanese.description = req.body.description;
  japanese.descriptionZH = req.body.descriptionZH;
  japanese.topDiameter = req.body.topDiameter;
  japanese.botDiameter = req.body.botDiameter;
  japanese.length = req.body.length;
  japanese.width = req.body.width;
  japanese.height = req.body.height;
  japanese.dynasty = req.body.dynasty;
  japanese.category = req.body.category;

  japanese.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(japanese);
    }
  });
};

/**
 * Delete an japanese
 */
exports.delete = function (req, res) {
  var japanese = req.japanese;

  japanese.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(japanese);
    }
  });
};

/**
 * List of Japanese
 */
// exports.list = function (req, res) {
//   Japanese.find().sort('-created').exec(function (err, japanese) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       // var dynastes = _.compact(_.map(_.uniqBy(japanese, 'dynasty'), 'dynasty'));
//       // var categories = _.compact(_.map(_.uniqBy(japanese, 'category'), 'category'));
//       // res.json({ data: japanese, metaData: { dynastyList: dynastes, categoryList: categories } });
//       return japanese;
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
//   Japanese.find(filter).sort('-created').exec(function (err, japanese) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       // var dynastes = _.compact(_.map(_.uniqBy(japanese, 'dynasty'), 'dynasty'));
//       // var categories = _.compact(_.map(_.uniqBy(japanese, 'category'), 'category'));
//       // res.json({ data: japanese, metaData: { dynastyList: dynastes, categoryList: categories } });
//       return japanese;
//     }
//   });
// };

exports.list = function (req, res) {
  var result = {};
  Japanese.find().sort('-created').exec()
    .then(function (japanese) {
      result.data = japanese;
      return Japanese.find().distinct('dynasty').exec();
    })
    .then(function (dynastes) {
      result.metaData = { dynastyList: dynastes };
      return Japanese.find().distinct('category').exec();
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
  Japanese.find(filter).sort('-created').exec()
    .then(function (japanese) {
      result.data = japanese;
      return Japanese.find().distinct('dynasty').exec();
    })
    .then(function (dynastes) {
      result.metaData = { dynastyList: dynastes };
      return Japanese.find(dyanstyFilter).distinct('category').exec();
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
 * Japanese middleware
 */
exports.japaneseByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Japanese is invalid'
    });
  }

  Japanese.findById(id).populate('user', 'displayName').exec(function (err, japanese) {
    if (err) {
      return next(err);
    } else if (!japanese) {
      return res.status(404).send({
        message: 'No japanese with that identifier has been found'
      });
    }
    req.japanese = japanese;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change japanese image location.
  // var upload = multer(config.uploads.japaneseImageUpload).single('newPicture');
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

        Japanese.findById(req.body.japaneseId).exec(function (err, japanese) {
          if (!japanese) {
            return res.status(404).send({
              message: 'No japanese with that identifier has been found'
            });
          }

          japanese.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          japanese.save(function (saveError) {
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
