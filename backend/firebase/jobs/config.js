var env = require('node-env-file');
env(__dirname + '/.env');

module.exports = {
  FB_DB: process.env.FB_DB,
  FB_MASTER_SECRET: process.env.FB_MASTER_SECRET,
  NODEMAILER: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // use SSL
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  }
};
