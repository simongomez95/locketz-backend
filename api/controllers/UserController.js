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

    uploadAvatar: function (req, res) {
        req.file('avatar').upload({
            adapter: require('skipper-postgresql'),
            connection: {
                host: process.env.DB_PORT_5432_TCP_ADDR,
                user: 'simo',
                password: 'contrasena'
            }
        },function whenDone(err, uploadedFiles) {
            if (err) {
                return res.negotiate(err);
            }

            // If no files were uploaded, respond with an error.
            if (uploadedFiles.length === 0){
                return res.badRequest('No file was uploaded');
            }

            // Save the "fd" and the url where the avatar for a user can be accessed
            userId  = jwToken.decode(req);
            User.update(userId, {
                avatar: uploadedFiles[0]
            })
                .exec(function (err){
                    if (err) return res.negotiate(err);
                    return res.ok();
                });
        });
    }
};