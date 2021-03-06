const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// SIGN UP
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).send("Name, email and password field cannot be empty");
    };

    if(password.length < 6) {
        return res.status(400).send("Password must be at least 6 characters");
    };

    const user = await User.findOne({ where: { email: email }});
    if(user == null) {
        const hashPassword = await bcrypt.hash(password, 10);
        const userCreated = await User.create({
            name: name,
            email: email,
            password: hashPassword
        });

        const maxAge = 3 * 24 * 60 * 60; // 3 days
        const token = jwt.sign({ id: userCreated.id }, process.env.TOKEN_SECRET, {
            expiresIn: maxAge
        });
        res.cookie('authToken', token, { httpOnly: true, maxAge: maxAge * 1000 });
    
        return res.status(201).send(`User was created! Welcome, ${userCreated.name}`)
    } else {
        return res.status(409).send("Email already exists");
    };

}



// LOGIN 
const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).send("Email and password field cannot be empty");
    };

    const user = await User.findOne({ where: { email: email }});
    if(!user) {
        return res.status(400).send("Email does not exist")
    };
    
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) {
        return res.status(400).send("Invalid password");
    };

    const maxAge = 3 * 24 * 60 * 60; // 3 days
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    });
    res.cookie('authToken', token, { httpOnly: true, maxAge: maxAge * 1000 });

    return res.status(200).send(`Hello, ${user.name}!`);
};



// LOGOUT
const logout = (req, res) => {
    res.cookie('authToken', '', { maxAge: 1 });
    return res.status(200).send("User logged out");
};


module.exports = {
    signup,
    login,
    logout
};