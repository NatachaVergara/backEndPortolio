const nodemailer = require('nodemailer');
const { credentials_MAIL_USERNAME, credentials_MAIL_PASSWORD, credentials_OAUTH2_CLIENTID, credentials_OAUTH2_CLIENT_SECRET, credentials_OAUTH2_REFRESH_TOKEN } = require('../config/mail_credentials.config');

//const credentials = require('../config/mail_credentials.config.js')


module.exports.sendMail = ({to, subject, text}) => new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: credentials_MAIL_USERNAME,
            pass: credentials_MAIL_PASSWORD,
            clienteId: credentials_OAUTH2_CLIENTID,
            clientSecret: credentials_OAUTH2_CLIENT_SECRET,
            refreshToken: credentials_OAUTH2_REFRESH_TOKEN
        }
    });

    let mailOptions = {
        from: 'ntchvergara@gmail.com',
        to,
        subject,
        text
    
    }
    
    transporter.sendMail(mailOptions, function(err,data) {
        if(err){
            rej(err)
        }else{
            res(true)
        }
    })



})


