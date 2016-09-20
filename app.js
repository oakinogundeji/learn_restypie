'use strict';
require('dotenv').config();
//=============================================================================
/**
 * module dependencies
 */
//=============================================================================
const
  express = require('express'),
  bParser = require('body-parser'),
  compression = require('compression'),
  Connectors = require('./connectors');
//=============================================================================
/**
 * express instance
 */
//=============================================================================
const app = express();
//=============================================================================
/**
 * mpdule config
 */
//=============================================================================
const
  port = process.env.PORT || 3030,
  env = process.env.NODE_ENV || 'development';
app.set('port', port);
app.set('env', env);
//=============================================================================
/**
 * module middleware
 */
//=============================================================================
if(env == 'development') {
  app.use(require('morgan')('dev'));
  require('clarify');
}
app.use(bParser.json());
app.use(bParser.urlencoded({extended: true}));
app.use(compression());
//=============================================================================
/**
 * routes
 */
//=============================================================================
app.get('/api/test', (req, res) => {
  return res.status(200).json('TEST!');
});
app.post('/api/users', (req, res) => {
  Connectors.User.create({
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email
  }).
    then(user => {
      console.log('user', user.toPublic());
      return res.status(200).json(user.toPublic());
    }).
    catch(err => {
      console.log('there was an error completing the create');
      console.error(err);
      return res.status(500).json('sorry!');
    });
});
app.get('/api/users', (req, res) => {
  Connectors.User.find().
    then(users => {
      console.log('users in db', users);
      return res.status(200).json('found!')
    }).
    catch(err => {
      console.log('there was error completing the findall');
      console.error(err);
      return res.status(500).json('sorry!');
    });
});
//=============================================================================
/**
 * exported object
 */
//=============================================================================
module.exports = app;
//=============================================================================
