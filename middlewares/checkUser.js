const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const checkUser = (req, res, next) => {
    const token = req.cookies.authToken;

    if(token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, userToken) => {
            if(err) {
                res.status(403).send('Access denied!');
            };

            const user = await User.findOne({ where: { id: userToken.id }})
            if(user) {
                res.locals.user = user.name
                next()
            } else {
                res.status(404).send("User does not exists")
                res.locals.user = null;
                next()
            }
        });
    };
};

module.exports = checkUser;