'use strict';

import * as mongo from 'mongoose';
import * as restify from 'restify';
import * as passport from 'passport';
import getLogger from './lib/logger';
import * as ideaController from './lib/controllers/idea';
import * as userController from './lib/controllers/user';
import * as strategies from './lib/strategies';

// establish connection with monogdb
mongo.connect('mongodb://localhost:27017/test');

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

app.use(passport.initialize());

// configure various passport strategies

passport.use(strategies.jwtStrategy);
passport.use(strategies.basicStrategy);

const basicMiddleware = passport.authenticate('basic', {
  session: false
});

const jwtMiddleware = passport.authenticate('jwt', {
  session: false
});

app.get('/', function(req, res) {
  res.send('Home');
});

// User Routes
app.post('/user/register', userController.create);
app.post('/user/login', basicMiddleware, userController.login);

// Idea Routes
app.post('/idea', jwtMiddleware, ideaController.create);
app.get('/idea/:id', jwtMiddleware, ideaController.get);

const port = process.env.PORT || 8900;

process.on('uncaughtException', function(error) {
  log.error(error);
});

app.listen(port, function() {
  log.info('Successfully started the app at port - ', port);
});

export default app;
