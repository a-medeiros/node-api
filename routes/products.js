const express = require('express');
const router = express.Router();
const allProducts = require('../controllers/products');
const isAuth = require('../middlewares/isAuth');
const checkUser = require('../middlewares/checkUser');

router.get('/products', isAuth, checkUser, allProducts);

module.exports = router;