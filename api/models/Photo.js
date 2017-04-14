/**
 * Photo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  ttl: '1d',

  attributes: {

    owner: {
      model: 'user',
      unique: 'true'
    },

    url: {
      type: 'string',
      required: 'true',
      unique: 'true'
    },

    fd: {
      type: 'string',
      required: 'true',
      unique: 'true'
    }
  }


};
