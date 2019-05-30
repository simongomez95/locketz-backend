/**
 * ReadingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  // POST /reading/new
  new: function (req, res) {
    Reading.create(req.body).exec(function (err, reading) {
      console.log(reading)
      if (err) {
        return res.json(err.status, {err: err});
      }
      // If user created successfuly we return user and token as response
      if (reading) {
        // NOTE: payload is { id: user.id}
        res.json(200, {reading:reading});
      }
    });

  },
};

