const express = require('express');
const app = express();
const bp = require('body-parser');
const cors = require('cors');
const sendEmail = require('./routes/sendEmail');
const reCaptcha = require('./routes/reCaptcha');
const port = 3000;

//middlewares
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }));
app.use(cors({ // allow cors for a specific origin 
  origin: process.env.CORS_ORIGIN_BASE_URL
}))

//routes
app.use('/sendmail', sendEmail); // send email
app.use('/captcha', reCaptcha); // verify reCaptcha 

app.listen(port, () => {
  console.log('listening on port', port);
})