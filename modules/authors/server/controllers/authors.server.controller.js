'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Author = mongoose.model('Author'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an author
 */
exports.create = function (req, res) {
  var author = new Author(req.body);
  author.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(author);
    }
  });
};

/**
 * Show the current painting
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var author = req.author ? req.author.toJSON() : {};
  res.json(author);
};

/**
 * Update an author
 */
exports.update = function (req, res) {
  var author = req.author;

  author.name = req.body.name;
  author.nameZH = req.body.nameZH;
  author.description = req.body.description;
  author.descriptionZH = req.body.descriptionZH;
  author.birthYear = req.body.birthYear;
  author.deadYear = req.body.deadYear;
  author.dynasty = req.body.dynasty;


  author.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(author);
    }
  });
};

/**
 * Delete an author
 */
exports.delete = function (req, res) {
  var author = req.author;

  author.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(author);
    }
  });
};

/**
 * List of Authors
 */
exports.list = function (req, res) {
  Author.find().sort('-created').exec(function (err, authors) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(authors);
    }
  });
};

/**
 * Author middleware
 */
exports.authorByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Author is invalid'
    });
  }

  Author.findById(id).exec(function (err, author) {
    if (err) {
      return next(err);
    } else if (!author) {
      return res.status(404).send({
        message: 'No author with that identifier has been found'
      });
    }
    req.author = author;
    next();
  });
};
