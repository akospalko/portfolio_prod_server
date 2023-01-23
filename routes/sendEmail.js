const express = require('express');
const sendEmail = require('../controllers/sendEmail'); 
const router = express.Router();

//routes for /sendmail
router.post('/', sendEmail); 

module.exports = sendEmail;