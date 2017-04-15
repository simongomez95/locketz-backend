module.exports = function (req, res, next) {
    type = User.findOne(jwToken.getId(req)).exec(function (err, user) {
        if (err) {
            return res.serverError(err);
        }
        if (!user) {
            console.log("no hay usuario lol2");
            return res.notFound();
        }
        console.log(user.userType);
        if (user.userType){
            return next();
        }
        else {
            return res.json(401, {err: 'Not content creator'});
        }
    });
};