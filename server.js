'use strict';
//=============================================================================
/**
 * module dependencies
 */
//=============================================================================
const
  app = require('./app'),
  http = require('http'),
  db = require('./models');
//=============================================================================
/**
 * server instance
 */
//=============================================================================
const server = http.createServer(app);
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
    server.listen(port, () => {
      console.log(`Server up on port ${port} in ${env} mode`);
    });
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
