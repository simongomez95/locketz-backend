/**
 * Reading.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    tempAmbiente: {
      type: 'float',
      required: 'true'
    },
    humAmbiente: {
      type: 'float',
      required: 'true'
    },
    luz: {
      type: 'float',
      required: 'true'
    },
    bombillo: {
      type: 'boolean',
      required: 'true'
    },
    valvula: {
      type: 'boolean',
      required: 'true'
    },
  },

};

