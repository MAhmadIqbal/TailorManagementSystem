const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const { getMaxListeners } = require("../../models/token");
const { info } = require("console");

const sendEmail = async (email, subject,text) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      // host: process.env.EMAIL_HOST,
      service:'gmail',
      // port: 465,
      auth: {
        user: 'ahmad1.ngxoft@gmail.com',
        pass: 'ngxoft@019527', // naturally, replace both with your real credentials or an application-specific password
      },
    });

    // const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    // const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: 'ahmadiqbalpu@gmail.com',
        to: email,
        subject: subject,
        text:text
        // html: compiledTemplate(payload),
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        console.log(error)
        throw new error("error occured in sending email");
      } else {
        console.log('Email sent '+info.response)
        //  res.status(200).json({
        //   success: true,
        //   'information':info.response
        // });
        const emailStatus="email sent to"; 

        return true
      }
    });
  } catch (error) {
    return error;
  }
  return true
};

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

module.exports = sendEmail;