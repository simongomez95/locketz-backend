/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

// We don't want to store password with out encryption
var bcrypt = require('bcrypt');

module.exports = {

  schema: true,

  attributes: {
    email: {
      type: 'email',
      required: 'true',
      unique: true
    },

    username: {
      type: 'string',
      required: 'true',
      unique: 'true'
    },

    encryptedPassword: {
      type: 'string'
    },

    userType: {
      type: 'boolean', // True if Content Creator, False if consumer
      required: 'true'
    },

    avatarUrl: {
      type: 'string'
    },

    avatarFd: {
      type: 'string'
    },

    photos: {
      collection: 'photo',
      via: 'owner'
    },

    follows: {
      collection: 'user',
      via: 'followers',
      dominant: true
    },

    followers: {
      collection: 'user',
      via : 'follows'
    },

    // We don't wan't to send back encrypted password either
    toJSON: function () {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      return obj;
    }
  },
  // Here we encrypt password before creating a User
  beforeCreate : function (values, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if(err) return next(err);
      bcrypt.hash(values.password, salt, function (err, hash) {
        if(err) return next(err);
        values.encryptedPassword = hash;
        next();
      })
    })
  },

  comparePassword : function (password, user, cb) {
    bcrypt.compare(password, user.encryptedPassword, function (err, match) {

      if(err) cb(err);
      if(match) {
        cb(null, true, user.followers, user.following);
      } else {
        cb(err);
      }
    })
  }
};
