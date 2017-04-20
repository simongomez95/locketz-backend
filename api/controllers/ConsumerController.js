/**
 * ConsumerController
 *
 * @description :: Server-side logic for managing consumers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  // POST /consumer/follow - followUser(string)
  follow: function (req, res) {

    userId  = jwToken.getId(req);
    console.log(userId);
    console.log(req.body.followUser);
    console.log("a");
    User.findOne(userId).exec(function(err, user) {
      if(err) return res.negotiate(err);
      console.log(user);

      user.follows.add(req.body.followUser);

      user.save(function(err) {});
    });

    return res.ok();
  },

  // GET /consumer/getFollowing
  getFollowing: function (req, res) {
    userId  = jwToken.getId(req);
    User.findOne(userId).populate('follows').exec(function (err, user) {
      if (err) if(err) return res.negotiate(err);
      return res.json({
        following: user.follows
      });
    })
  },

  getPhotos: function (req, res) {
    userId  = jwToken.getId(req);
    User.findOne(req.body.followedUser).populate('photos').exec(function(err, user) {
      if (err) if(err) return res.negotiate(err);
      var SkipperDisk = require('skipper-disk');
      var fileAdapter = SkipperDisk(/* optional opts */);

      // // set the filename to the same file as the user uploaded
      // //res.set("Content-disposition", "attachment; filename='" + file.name + "'");
      //
      // // Stream the file down
      // fileAdapter.read(user.avatarFd)
      //   .on('error', function (err){
      //     return res.serverError(err);
      //   })
      //   .pipe(res);
      return res.json({
        photos: user.photos
      })
    })
  }
};

