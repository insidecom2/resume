require('dotenv').config()
const axios = require('axios');

const checkGoogleCaptcha = async (reCaptchaCode) => {
    const endPoint = 'https://www.google.com/recaptcha/api/siteverify';
    const secretKey = process.env.GOOGLE_CAPTCHA;
    const responseKey = reCaptchaCode;

    var response = await axios.get(endPoint, {
      params: {
        secret: secretKey,
        response: responseKey
      }
    });
  const result = response.data;
  return result.status;
}
  
module.exports = {checkGoogleCaptcha}