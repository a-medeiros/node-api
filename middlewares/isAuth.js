const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
    const token = req.cookies.authToken;
    if(!token) {
        return res.status(401).send("Access denied!");
    };

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.status(403).send('Invalid token');
        };

        next();
    });
}


module.exports = isAuth;