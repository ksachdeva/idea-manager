var env = require('node-env-file');
env(__dirname + '/.env');

module.exports = {
  FB_DB: process.env.FB_DB,
  FB_MASTER_SECRET: process.env.FB_MASTER_SECRET
};
