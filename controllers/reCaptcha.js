//validate recaptcha
const axios = require('axios');
require('dotenv').config();

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
    return res.status(400).json({ verified: false, statusMessage: 'Couldn\'t receive token', statusCode: 400 }); 
  } else {
    try {
      // verify captcha, store result 
      const verifiedCaptcha = await axios.post(verifyURL);
      verified = verifiedCaptcha.data.success;
      if(verified) {
        statusMessage = 'Captcha is valid!';
        statusCode = verifiedCaptcha.status || 200;
        return res.status(statusCode).json({ verified: verified, statusMessage: statusMessage, statusCode: statusCode });
      }
    } catch (error) {
      statusMessage = 'Captcha is invalid!';
      statusCode = verifiedCaptcha.status || 500;
      return res.status(statusCode).json({ verified: verified, statusMessage: statusMessage, statusCode: statusCode });
    }
  }
}

module.exports = validateReCaptcha;