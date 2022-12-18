require('dotenv').config()
const lineNotify = require('line-notify-nodejs')(process.env.LINE_NOTIC_TOKEN);

async function sendNotic(body) {
    try {
        await lineNotify.notify({
            message: `\nName : ${body.name} \n Email: ${body.email} \nSubject: ${body.subject} \nMessage: ${body.message} `,
        }).then(() => {
            console.log('send completed!');
        });
        return {
            status: true,
        }
    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: 'Error'
        }
    }



}

module.exports = { sendNotic }; 