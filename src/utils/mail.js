const nodemailer = require('nodemailer')

//const credentials = require('../config/mail_credentials.config.js')


module.exports.sendMail = ({to, subject, text}) => new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: "ntchvergara@gmail.com",
            pass: "Elisabet1986",
            clienteId: '383376051581-9ja3sovb4l5cti1dbv30paog2icv9m4o.apps.googleusercontent.com',
            clientSecret: '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',
            refreshToken: '1//04HRr29E1fwSKCgYIARAAGAQSNwF-L9IrTdY19pyUS5NziqyA2qxGarebb8LtjQlVIZZu1jFYlKOwE9KPDqY6ex9_pXYSyfY4L_E'
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


