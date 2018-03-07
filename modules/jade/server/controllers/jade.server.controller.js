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
  Jade = mongoose.model('Jade');
mongoose.Promise = global.Promise;
/**
 * Create an jade
 */
exports.create = function (req, res) {
  var jade = new Jade(req.body);
  jade.user = req.user;

  jade.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(jade);
    }
  });
};

/**
 * Show the current jade
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var jade = req.jade ? req.jade.toJSON() : {};

  // Add a custom field to the Jade, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Jade model.
  jade.isCurrentUserOwner = !!(req.user && jade.user && jade.user._id.toString() === req.user._id.toString());

  res.json(jade);
};

/**
 * Update an jade
 */
exports.update = function (req, res) {
  var jade = req.jade;

  jade.name = req.body.name;
  jade.nameZH = req.body.nameZH;
  jade.description = req.body.description;
  jade.descriptionZH = req.body.descriptionZH;
  jade.topDiameter = req.body.topDiameter;
  jade.botDiameter = req.body.botDiameter;
  jade.length = req.body.length;
  jade.width = req.body.width;
  jade.height = req.body.height;
  jade.dynasty = req.body.dynasty;
  jade.category = req.body.category;

  jade.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(jade);
    }
  });
};

/**
 * Delete an jade
 */
exports.delete = function (req, res) {
  var jade = req.jade;

  jade.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(jade);
    }
  });
};

/**
 * List of Jade
 */
// exports.list = function (req, res) {
//   Jade.find().sort('-created').exec(function (err, jade) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       // var dynastes = _.compact(_.map(_.uniqBy(jade, 'dynasty'), 'dynasty'));
//       // var categories = _.compact(_.map(_.uniqBy(jade, 'category'), 'category'));
//       // res.json({ data: jade, metaData: { dynastyList: dynastes, categoryList: categories } });
//       return jade;
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
//   Jade.find(filter).sort('-created').exec(function (err, jade) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       // var dynastes = _.compact(_.map(_.uniqBy(jade, 'dynasty'), 'dynasty'));
//       // var categories = _.compact(_.map(_.uniqBy(jade, 'category'), 'category'));
//       // res.json({ data: jade, metaData: { dynastyList: dynastes, categoryList: categories } });
//       return jade;
//     }
//   });
// };

exports.list = function (req, res) {
  var result = {};
  Jade.find().sort('-created').exec()
    .then(function (jade) {
      result.data = jade;
      return Jade.find().distinct('dynasty').exec();
    })
    .then(function (dynastes) {
      result.metaData = { dynastyList: dynastes };
      return Jade.find().distinct('category').exec();
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
  Jade.find(filter).sort('-created').exec()
    .then(function (jade) {
      result.data = jade;
      return Jade.find().distinct('dynasty').exec();
    })
    .then(function (dynastes) {
      result.metaData = { dynastyList: dynastes };
      return Jade.find(dyanstyFilter).distinct('category').exec();
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
 * Jade middleware
 */
exports.jadeByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Jade is invalid'
    });
  }

  Jade.findById(id).populate('user', 'displayName').exec(function (err, jade) {
    if (err) {
      return next(err);
    } else if (!jade) {
      return res.status(404).send({
        message: 'No jade with that identifier has been found'
      });
    }
    req.jade = jade;
    next();
  });
};

/**
 * Update picture
 */
exports.changePicture = function (req, res) {
  var user = req.user;

  // Todo: change jade image location.
  // var upload = multer(config.uploads.jadeImageUpload).single('newPicture');
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

        Jade.findById(req.body.jadeId).exec(function (err, jade) {
          if (!jade) {
            return res.status(404).send({
              message: 'No jade with that identifier has been found'
            });
          }

          jade.imageURL = config.uploads.profileUpload.dest + req.file.filename;
          jade.save(function (saveError) {
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
