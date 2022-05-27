const nodemailer = require('nodemailer')

//const credentials = require('../config/mail_credentials.config.js')


module.exports.sendMail = ({to, subject, text}) => new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: MAIL_USERNAME,
            pass: MAIL_PASSWORD,
            clienteId: OAUTH2_CLIENTID,
            clientSecret: OAUTH2_CLIENT_SECRET,
            refreshToken: OAUTH2_REFRESH_TOKEN
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


