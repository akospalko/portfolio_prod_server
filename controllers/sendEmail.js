//send mail module
const nodemailer = require('nodemailer');
require('dotenv').config(); // access .env contents stored in a variable 
const getStatusCode  = require('../helper/getStatusCode');

//auth data to access email account
const emailAuth = {
  myEmail: process.env.NODEMAILER_EMAIL,
  mypassword: process.env.NODEMAILER_PASSWORD,
}

//
const mailTemplate = (name, email, message) => {
  return `<h3> Information: </h3>
  <ul style=" margin:0 0 0 10px; padding:0; ">
    <li> Name: ${name} </li>
    <li> E-mail: ${email} </li>
  </ul>
  <h3> Message: </h3>
  <p style=" margin:0 0 0 10px; ">  ${message} </p>`
}

const sendEmail = async (req, res) => {
    if(!req.body) return;
    const { name, email, message, subject } = req.body;
    //transport obj, used to send an email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: emailAuth.myEmail,
        pass: emailAuth.mypassword
      }
    });
  
    //configure transport object
    const mailOptions = {
      from: email,
      to: emailAuth.myEmail,
      subject: subject || `Message from ${name}`,
      html: mailTemplate(name, email, message)
    };
    
    //send mail
    let statusMessage = '';
    let isSent = false;
    let statusCode;
    try {
      const send = await transporter.sendMail(mailOptions);
      if(send) {
        isSent = true;
        statusMessage = 'Success. Mail is sent!';
        statusCode = getStatusCode(send.response);
        res.status(statusCode).json({ mailSent: isSent, statusMessage: statusMessage, statusCode: statusCode })
      }
    } catch (error) {
        isSent = false;
        statusMessage = 'Failure. Try again!';
        statusCode = getStatusCode(error.response) || 500;
        res.status(statusCode).json({ mailSent: isSent, statusMessage: statusMessage, statusCode: statusCode });
    }
    transporter.close();
  } 
 module.exports = sendEmail; 