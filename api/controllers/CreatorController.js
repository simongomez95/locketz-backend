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

          // Save the "fd" and the url where the avatar for a user can be accessed
          userId  = jwToken.getId(req);
          User.update(userId, {

              // Generate a unique URL where the avatar can be downloaded.
              // todo: Poner app URL en variable de entorno
              // avatarUrl: require('util').format('%s/user/avatar/%s', sails.config.appUrl, userId),

              avatarUrl: '/app/user/avatar/'+userId,

              // Grab the first file and use it's `fd` (file descriptor)
              avatarFd: uploadedFiles[0].fd
          })
              .exec(function (err){
                  if (err) return res.negotiate(err);
                  return res.ok();
              });
      });
  }
};

