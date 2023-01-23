//validate recaptcha
const axios = require('axios');
require('dotenv').config();
const getStatusCode = require('../helper/getStatusCode');

const validateReCaptcha = async (req, res) => {
  //containers
  let verified = false;
  let statusMessage = '';
  let statusCode;
  //get sent token from req.body
  const { token } = req.body;
  //get secret key, set up request URL
  const secretKey = process.env.CAPTCHA_V3_SECRET_KEY;
  const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${ secretKey }&response=${ token }`;
  
  if(!token) {
    return res.status(400).json({ success: false, responseMsg: 'Couldn\'t receive token' }); 
  } else {
    console.log('validating recaptcha', token);
    try{
      // verify captcha, store result 
      const verifiedCaptcha = await axios.post(verifyURL);
      console.log('validating recaptcha', verifiedCaptcha);
      verified = verifiedCaptcha.data.success;
      if(verified) {
        statusMessage = 'Success. Captcha is valid!';
        statusCode = getStatusCode(verifiedCaptcha.response);
        return res.status(statusCode).json({ verified: verified, statusMessage: statusMessage, statusCode: statusCode });
      }
    } catch (error) {
      statusMessage = 'Failure. Captcha is invalid!';
      statusCode = getStatusCode(error.response) || 500;
      return res.status(statusCode).json({ verified: verified, statusMessage: statusMessage, statusCode: statusCode });
    }
  }
}

module.exports = validateReCaptcha;