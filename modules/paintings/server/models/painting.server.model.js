'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Painting Schema
 */

var PaintingSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Name cannot be blank'
  },
  type: {
    type: String,
    default: '',
    trim: true 
  },
  length: {
    type: Number,
    trim: true
  },
  width: {
    type: Number,
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  imageURL: {
    type: String,
    default: 'modules/users/client/img/profile/default.png'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  author: {
    type: Schema.ObjectId,
    ref: 'Author'
  }
});

mongoose.model('Painting', PaintingSchema);
