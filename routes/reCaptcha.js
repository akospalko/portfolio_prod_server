const express = require('express');
const reCaptcha = require('../controllers/reCaptcha');
const router = express.Router();

//route for /captcha
router.post('/', reCaptcha);

module.exports = reCaptcha;