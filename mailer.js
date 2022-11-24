"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(mail, otp) {
    console.log(mail + "   " + otp)

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "messenger.bot.one@gmail.com", // generated ethereal user
            pass: "gnlsppnynfupoxrq", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"GLAU 🦄 Fashion 🐼" <preprationless@gmail.com>', // sender address
        to: mail, // list of receivers
        subject: "Authentication ✔", // Subject line
        text: "Email Verification", // plain text body
        html: "<!DOCTYPE html><html><body>" + "<b>Your Otp for verification is  </b>" + otp + "</body></html>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>



}
// main().catch(console.error );
module.exports = main;