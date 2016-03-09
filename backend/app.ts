'use strict';

import getLogger from './lib/logger';
import * as restify from 'restify';

const log = getLogger();

const app = restify.createServer({
  log: log
});

app.use(restify.acceptParser(app.acceptable));
app.use(restify.authorizationParser());
app.use(restify.dateParser());
app.use(restify.queryParser());
app.use(restify.jsonp());
app.use(restify.gzipResponse());
app.use(restify.bodyParser());

app.get('/', function(req, res) {
  res.send("Test");
});

const port = process.env.PORT || 8900;

process.on('uncaughtException', function(error) {
  log.error(error);
});

app.listen(port, function() {
  log.info('Successfully started the app at port - ', port);
});

export default app;
