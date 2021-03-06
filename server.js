const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const db = require('./database/index');
const authRoute = require('./routes/auth');
const productsRoute = require('./routes/products');

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

// authentication page
app.use('/', authRoute);


// get all products
app.use('/', productsRoute);


// Home page
app.get('/', (req, res) => {
    return res.status(200).send("Hello, world!")
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});