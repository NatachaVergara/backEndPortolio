const nodemailer = require('nodemailer');


const credentials = require('../config/mail_credentials.config.js')


module.exports.sendMail = ({to, subject, text}) => new Promise((res, rej) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: credentials.MAIL_USERNAME,
            pass: credentials.MAIL_PASSWORD,
            clientId: credentials.OAUTH2_CLIENTID,
            clientSecret: credentials.OAUTH2_CLIENT_SECRET,
            refreshToken: credentials.OAUTH2_REFRESH_TOKEN
        }
    });

    let mailOptions = {
        from: 'ntchvergara@gmail.com',
        to,
        subject,
        text
    
    }
    
    transporter.sendMail(mailOptions, function(err, data) {
        if(err){
            rej(err)
        }else{
            res(true)
        }
    })



})


