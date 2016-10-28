'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Teapot Schema
 */

var TeapotSchema = new Schema({
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
  height:{
    type: Number,
    trim: true
  },
  dynasty:{
    type: String,
    default: '',
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
  }
});
mongoose.model('Teapot', TeapotSchema);
