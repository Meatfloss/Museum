'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Painting = mongoose.model('Painting'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an painting
 */
exports.create = function (req, res) {
  var painting = new Painting(req.body);
  painting.user = req.user;

  painting.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(painting);
    }
  });
};

/**
 * Show the current painting
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var painting = req.painting ? req.painting.toJSON() : {};

  // Add a custom field to the Painting, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Painting model.
  painting.isCurrentUserOwner = !!(req.user && painting.user && painting.user._id.toString() === req.user._id.toString());

  res.json(painting);
};

/**
 * Update an painting
 */
exports.update = function (req, res) {
  var painting = req.painting;

  painting.title = req.body.title;
  painting.content = req.body.content;
  painting.author = req.body.author;
  painting.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(painting);
    }
  });
};

/**
 * Delete an painting
 */
exports.delete = function (req, res) {
  var painting = req.painting;

  painting.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(painting);
    }
  });
};

/**
 * List of Paintings
 */
exports.list = function (req, res) {
  Painting.find().sort('-created').populate('user', 'displayName').populate('author', 'name').exec(function (err, paintings) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(paintings);
    }
  });
};

/**
 * Painting middleware
 */
exports.paintingByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Painting is invalid'
    });
  }

  Painting.findById(id).populate('user', 'displayName').populate('author', 'name').exec(function (err, painting) {
    if (err) {
      return next(err);
    } else if (!painting) {
      return res.status(404).send({
        message: 'No painting with that identifier has been found'
      });
    }
    req.painting = painting;
    next();
  });
};
