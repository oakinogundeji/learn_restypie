'use strict';
//=============================================================================
/**
 * module dependencies
 */
//=============================================================================
const
  app = require('./app'),
  http = require('http'),
  Restypie = require('restypie'),
  db = require('./models');
//=============================================================================
/**
 * module variables
 */
//=============================================================================
const
  port = app.get('port'),
  env = app.get('env');
//=============================================================================
/**
 * module config
 */
//=============================================================================
const
  api = new Restypie.API({
    path: '/api',
    routerType: Restypie.RouterTypes.EXPRESS
  }),
  server = http.createServer(app);
//=============================================================================
/**
 * sync db and bind server to port
 */
//=============================================================================
db.db_conn.sync({
  force: true,
  logging: console.log
}).
  then(() => {
    console.log('Yaaay, db up and models built');
    Object.keys(db.db_conn.models).
      forEach(model => {
        console.log(model);
        console.log(' model has been created as table');
      });
    api.
      registerResources({
        users: require('./resources/user')
      }).
      launch(app, {port: port});

    server.listen(port, err => {
      if(err) {
        console.log('no good');
        console.error(err);
        process.exit(1);
      }
      console.log(`Server up on port ${port} in ${env} mode`);
    });
  }).
  catch(err => {
    console.log('bummer!');
    console.error(err);
    process.exit(1);
  });
//=============================================================================
/**
 * exported object
 */
//=============================================================================
if(require.main != module) {
  module.exports = server;
}
//=============================================================================
