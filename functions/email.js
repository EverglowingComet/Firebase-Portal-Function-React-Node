const nodemailer = require("nodemailer");
const { smtpDomain, smtpUser, smtpPassword } = require("./constants");

const mailTransport = nodemailer.createTransport({
    host: smtpDomain,
    port: 587,
    secure: false,
    auth: {
        user: smtpUser,
        pass: smtpPassword
    }
});

const sendEmail = (to, subject, text, html) => {
    
    const from = "support@iconnectgroup.com";
    
    const message = {
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html
    };
    return mailTransport.sendMail(message).then(() => {
        console.log("email sent to:", to);
        return new Promise(((resolve, reject) => {
       
            return resolve({
                result: "email sent to:", to
            });
        }));
    });
};
