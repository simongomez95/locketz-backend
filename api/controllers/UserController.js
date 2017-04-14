/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    create: function (req, res) {
        if (req.body.password !== req.body.confirmPassword) {
            return res.json(401, {err: 'Password doesn\'t match, What a shame!'});
        }

        User.create(req.body).exec(function (err, user) {
            if (err) {
                return res.json(err.status, {err: err});
            }
            // If user created successfuly we return user and token as response
            if (user) {
                // NOTE: payload is { id: user.id}
                res.json(200, {user: user, token: jwToken.issue({id: user.id})});
            }
        });
    },

    // POST /user/uploadAvatar file: avatar, token
    uploadAvatar: function (req, res) {
        req.file('avatar').upload({
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
    },

    downloadAvatar: function (req, res){

        userId  = jwToken.getId(req);

        User.findOne(userId).exec(function (err, user){
            if (err) {
                return res.negotiate(err);
            }
            if (!user) {
                console.log("no hay usuario lol");
                return res.notFound();
            }

            // User has no avatar image uploaded.
            // (should have never have hit this endpoint and used the default image)
            if (!user.avatarFd) {
                console.log("no hay fd");
                return res.notFound();
            }

            var SkipperDisk = require('skipper-disk');
            var fileAdapter = SkipperDisk(/* optional opts */);

            // set the filename to the same file as the user uploaded
            //res.set("Content-disposition", "attachment; filename='" + file.name + "'");

            // Stream the file down
            fileAdapter.read(user.avatarFd)
                .on('error', function (err){
                    return res.serverError(err);
                })
                .pipe(res);
        });
    },

    uploadPhoto: function (req, res) {

    }
};