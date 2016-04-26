const nodemailer = require('nodemailer');
const config = require('./config');

function sendEmailVerification(code, to) {
  var transporter = nodemailer.createTransport(config.NODEMAILER);

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: '"Idea Manager" <noreply@nodomain.com>', // sender address
    to: to,
    subject: 'Please verify your email address', // Subject line
    html: `<p>Your verification code is <b>${code}</b>`
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
}

module.exports.sendEmailVerification = sendEmailVerification;
