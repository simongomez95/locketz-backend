/**
 * CreatorController
 *
 * @description :: Server-side logic for managing creators
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `CreatorController.uploadPhoto()`
   */
  // POST /creator/uploadPhoto file: photo, token
  uploadPhoto: function (req, res) {
    req.file('photo').upload({
      maxBytes: 10000000
    },function whenDone(err, uploadedFiles) {
      if (err) {
        return res.negotiate(err);
      }

      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0){
        return res.badRequest('No file was uploaded');
      }

      console.log("llega?");

      // Save the "fd" and the url where the avatar for a user can be accessed
      userId  = jwToken.getId(req);
      Photo.create({
        owner: userId,

        fd: uploadedFiles[0].fd
      })
        .exec(function (err, pets){
          if (err) {
            return res.json(err.status, {err: err});
          }
          console.log(pets);
          return res.ok();
        });
    });

    return res.ok();
  },

  // GET /creator/getFollowers
  getFollowers: function (req, res) {
    userId  = jwToken.getId(req);
    User.findOne(userId).populate('followers').exec(function (err, user) {
      if (err) if(err) return res.negotiate(err);
      return res.json({
        followers: user.followers
      });
    })
  }
};

