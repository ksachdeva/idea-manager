'use strict';

const express = require('express');
const ParseServer = require('parse-server').ParseServer;

const databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/idea',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || 'myMasterKey',
  serverURL: process.env.SERVER_URL || 'http://localhost:1337'
});

const app = express();

// Serve the Parse API on the /parse URL prefix
const mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
  res.status(200).send('I dream of being a web site.');
});

const port = process.env.PORT || 1337;
app.listen(port, function () {
  console.log('idea-server running on port ' + port + '.');
});