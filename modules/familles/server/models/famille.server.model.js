'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Famille Schema
 */

var FamilleSchema = new Schema({
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
  nameZH: {
    type: String,
    default: '',
    trim: true,
    required: 'Name cannot be blank'
  },
  topDiameter: {
    type: Number,
    trim: true
  },
  botDiameter: {
    type: Number,
    trim: true
  },
  height: {
    type: Number,
    trim: true
  },
  dynasty: {
    type: String,
    default: '',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  descriptionZH: {
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
mongoose.model('Famille', FamilleSchema);
