'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Author Schema
 */

var AuthorSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Author name cannot be blank'
  },
  birthYear: {
    type: Number,
    trim: true
  },
  deadYear: {
    type: Number,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  dynasty: {
    type: String,
    trim: true
  }
});

mongoose.model('Author', AuthorSchema);
